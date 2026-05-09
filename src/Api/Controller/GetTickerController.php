<?php

namespace Espn\CfbTicker\Api\Controller;

use Espn\CfbTicker\Service\TickerProvider;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;

class GetTickerController implements RequestHandler
{
    protected TickerProvider $provider;

    public function __construct(TickerProvider $provider)
    {
        $this->provider = $provider;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $payload = $this->provider->getTickerData();

        if (isset($payload['error'])) {
            return new JsonResponse(['error' => $payload['error']]);
        }

        return new JsonResponse(['data' => $payload]);
    }
}
