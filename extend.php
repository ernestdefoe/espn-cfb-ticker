<?php

use Espn\CfbTicker\Api\Controller\GetTickerController;
use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less'),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new Extend\Routes('api'))
        ->get('/cfb-ticker', 'espn-cfb-ticker', GetTickerController::class),
];
