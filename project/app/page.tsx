'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/lib/redux/store';
import { fetchWeatherData } from '@/lib/redux/features/weatherSlice';
import { fetchCryptoData } from '@/lib/redux/features/cryptoSlice';
import { fetchNewsData } from '@/lib/redux/features/newsSlice';
import WeatherSection from '@/components/weather/WeatherSection';
import CryptoSection from '@/components/crypto/CryptoSection';
import NewsSection from '@/components/news/NewsSection';

const CITIES = ['New York', 'London', 'Tokyo'];
const CRYPTOS = ['bitcoin', 'ethereum', 'dogecoin'];

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Initial data fetch
    CITIES.forEach(city => dispatch(fetchWeatherData(city)));
    CRYPTOS.forEach(crypto => dispatch(fetchCryptoData(crypto)));
    dispatch(fetchNewsData());

    // Set up periodic data refresh
    const interval = setInterval(() => {
      CITIES.forEach(city => dispatch(fetchWeatherData(city)));
      CRYPTOS.forEach(crypto => dispatch(fetchCryptoData(crypto)));
      dispatch(fetchNewsData());
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">CryptoWeather Nexus</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <WeatherSection cities={CITIES} />
          <CryptoSection cryptos={CRYPTOS} />
          <NewsSection />
        </div>
      </div>
    </main>
  );
}