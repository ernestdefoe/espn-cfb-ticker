# ESPN CFB Ticker

A Flarum 2 extension that displays an ESPN-powered FBS college football ticker in the forum header.

## Installation

1. Copy this extension into `extensions/espn-cfb-ticker` inside your Flarum installation.
2. Run `composer require espn/cfb-ticker` if you publish it as a package, or register it manually.
3. Install frontend dependencies and build assets:
   - `npm install`
   - `npm run build`
4. Enable the extension in the Flarum admin dashboard.

## Features

- Fetches ESPN college football scoreboard data
- Displays a live ticker in the forum header
- Automatic scoreboard parsing for FBS matchups

## Notes

- The extension uses ESPN's public scoreboard API endpoint.
- If ESPN changes the endpoint or response format, the ticker may need an update.
