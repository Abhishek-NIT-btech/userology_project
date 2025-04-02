# userology_project
CryptoWeather Nexus

Overview

A multi-page dashboard integrating real-time weather updates, cryptocurrency data, and news, with WebSocket notifications.

Live Demo

Deployment Link (Replace with actual URL)

Features

Weather: Current conditions for New York, London, and Tokyo.

Crypto: Live BTC, ETH, and another crypto prices.

News: Top five crypto-related headlines.

WebSocket: Real-time price updates & weather alerts.

Favorites: Mark favorite cities/cryptos.

Responsive: Tailwind CSS for mobile-friendly UI.

Tech Stack

Frontend: Next.js, React (Hooks), Redux (Thunk/Saga), Tailwind CSS

APIs: OpenWeatherMap, CoinGecko, NewsData.io

WebSocket: CoinCap for live price updates

Deployment: Vercel/Netlify

Setup

git clone https://github.com/yourusername/cryptoweather-nexus.git
cd cryptoweather-nexus
npm install  # or yarn install

Environment Variables

Create .env.local and add:

NEXT_PUBLIC_WEATHER_API_KEY=your_api_key
NEXT_PUBLIC_CRYPTO_API_KEY=your_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_api_key
NEXT_PUBLIC_WEBSOCKET_URL=wss://ws.coincap.io/prices?assets=bitcoin,ethereum

Run & Deploy

npm run dev  # Start development server
npm run build  # Build for production

Challenges & Solutions

API Rate Limits: Implemented caching & error handling.

WebSocket Handling: Managed events with Redux middleware.

Responsive UI: Tailwind CSS for seamless design.

Future Enhancements

Dark mode, more cryptos/cities, better charts.

Contributing

Pull requests welcome!

License

MIT License
