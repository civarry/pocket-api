# Pocket API

Pocket API is a static, vanilla JavaScript web app styled to look like a handheld tablet sitting in your browser. Tapping an app icon swaps in a mini-app inside the "screen," each one talking to a different public API.

Despite the name, this isn't a wrapper around getpocket.com — "Pocket" here refers to the pocket-device look of the UI itself.

## The mini-apps

- **Weather** — look up current conditions (temperature, humidity, wind speed) for any location via the OpenWeatherMap API, with a background gradient and icon that change based on the weather description.
- **News** — search recent headlines via the GNews API, rendered as a scrollable card list with source, date, and description.
- **Bored** — fetches a random activity suggestion from the Bored API, with a button to reroll.
- **Calculator** — a basic on-screen calculator, no external API involved.

There's also a hidden feature: holding **Alt+W** opens a file picker to swap the tablet's wallpaper image, stored client-side.

## How it's built

No framework, no build step — plain HTML/CSS/JS. `index.html` renders the tablet shell and app-icon grid; `js/index.js` handles navigation between mini-apps by fetching each one's HTML fragment (`html/*.html`) into a shared content container and wiring up its behavior. Each mini-app's API logic lives in its own module under `js/` (`weather-api.js`, `news-api.js`, `bored-api.js`), and each has a matching stylesheet under `css/`. A preloader screen displays while the page's assets load.

## Running it

It's a static site — open `index.html` directly or serve the folder with any static file server. It's currently deployed on Vercel.

## Note

API keys for OpenWeatherMap and GNews are currently hardcoded in the client-side JS files, which is fine for a personal demo but means they're publicly visible in the page source — worth moving behind a proxy/env vars if this app handles real traffic.
