import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import HeaderSecondary from 'flarum/forum/components/HeaderSecondary';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';

app.initializers.add('espn-cfb-ticker', () => {
  const state = {
    isLoading: true,
    error: null,
    items: [],
  };

  extend(HeaderSecondary.prototype, 'items', function (items) {
    items.add(
      'espn-cfb-ticker',
      m(
        'div.EspnCfbTicker',
        state.isLoading
          ? m('div', { className: 'EspnCfbTicker-loading' }, [m(LoadingIndicator), ' Loading CFB ticker...'])
          : state.error
          ? m('div', { className: 'EspnCfbTicker-error' }, state.error)
          : m(
              'div.EspnCfbTicker-strip',
              state.items.map((item) => m('span.EspnCfbTicker-item', item))
            )
      ),
      1000
    );
  });

  app.request({ method: 'GET', url: `${app.forum.attribute('apiUrl')}/cfb-ticker` })
    .then((payload) => {
      if (payload.error) {
        state.error = payload.error;
      } else {
        state.items = payload.data || [];
      }
    })
    .catch(() => {
      state.error = 'Unable to load ESPN CFB ticker.';
    })
    .finally(() => {
      state.isLoading = false;
      m.redraw();
    });
});
