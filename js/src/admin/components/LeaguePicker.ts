import app from 'flarum/admin/app';
import Component from 'flarum/common/Component';

const t = (key: string) => app.translator.trans('ernestdefoe-espn-cfb-ticker.admin.settings.' + key);

interface Attrs {
  /**
   * The settings page's OWN stream for `ernestdefoe-espn-cfb-ticker.leagues`.
   * 🚨 Never `app.data.settings`: the page saves what differs between the two,
   * so writing there ticks the box and sends nothing.
   */
  value: (next?: string) => string;
  /** The same, for `ernestdefoe-espn-cfb-ticker.top25`: the ranked leagues cut to Top 25 games. */
  top25: (next?: string) => string;
}

const split = (value: string) =>
  String(value || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

const flip = (list: string[], key: string, on: boolean) => (on ? [...new Set([...list, key])] : list.filter((k) => k !== key)).join(',');

/** Which ESPN scoreboards the bar shows, as tick boxes over one comma-joined setting. */
export default class LeaguePicker extends Component<Attrs> {
  view() {
    // From the server's list (extend.php), never a copy written here.
    const leagues: string[] = (app.data as any).espnTickerLeagues || [];
    const ranked: string[] = (app.data as any).espnTickerRanked || [];
    const chosen = split(this.attrs.value());
    const top25 = split(this.attrs.top25());

    return m('.Form-group.CfbTickerLeagues', [
      m('label', t('leagues_label')),
      m('.helpText', t('leagues_help')),
      leagues.map((key) =>
        m('.CfbTickerLeagues-item', { key }, [
          m('label.checkbox', [
            m('input[type=checkbox]', {
              checked: chosen.includes(key),
              onchange: (e: Event) => this.attrs.value(flip(chosen, key, (e.target as HTMLInputElement).checked)),
            }),
            t('league.' + key),
          ]),
          // Offered once the league is ticked: a full college day is well
          // over a hundred games.
          ranked.includes(key) && chosen.includes(key)
            ? m('label.checkbox.CfbTickerLeagues-top25', [
                m('input[type=checkbox]', {
                  checked: top25.includes(key),
                  onchange: (e: Event) => this.attrs.top25(flip(top25, key, (e.target as HTMLInputElement).checked)),
                }),
                t('top25_label'),
              ])
            : null,
        ])
      ),
    ]);
  }
}
