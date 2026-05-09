<?php

namespace Espn\CfbTicker\Service;

class TickerProvider
{
    protected const ESPN_SCOREBOARD_URL = 'https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?seasontype=2';

    public function getTickerData(): array
    {
        $data = $this->fetchScoreboard();

        if (isset($data['error'])) {
            return ['error' => $data['error']];
        }

        $events = $data['events'] ?? [];

        if (empty($events)) {
            return ['error' => 'No college football events could be loaded from ESPN.'];
        }

        return array_values(array_filter(array_map([$this, 'buildTickerItem'], $events)));
    }

    protected function fetchScoreboard(): array
    {
        $context = stream_context_create([
            'http' => [
                'timeout' => 8,
                'header' => 'User-Agent: Flarum ESPN CFB Ticker/1.0\r\n',
            ],
        ]);

        $json = @file_get_contents(self::ESPN_SCOREBOARD_URL, false, $context);

        if ($json === false) {
            return ['error' => 'Unable to download ESPN scoreboard data.'];
        }

        $data = json_decode($json, true);

        if (!is_array($data)) {
            return ['error' => 'ESPN scoreboard response could not be parsed.'];
        }

        return $data;
    }

    protected function buildTickerItem(array $event): ?string
    {
        if (!isset($event['competitions'][0])) {
            return null;
        }

        $competition = $event['competitions'][0];
        $status = $event['status']['type']['shortDetail'] ?? $event['status']['type']['description'] ?? 'Status unavailable';

        $competitors = $competition['competitors'] ?? [];

        $teams = array_map(function (array $competitor) {
            $teamName = $competitor['team']['abbreviation'] ?? ($competitor['team']['displayName'] ?? 'TBD');
            $score = $competitor['score'] ?? '';
            return trim($teamName . ' ' . $score);
        }, $competitors);

        if (empty($teams)) {
            return null;
        }

        return implode(' vs. ', $teams) . ' · ' . $status;
    }
}
