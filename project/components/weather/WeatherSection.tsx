import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, CloudRain, Sun, Loader2 } from 'lucide-react';

interface WeatherSectionProps {
  cities: string[];
}

const WeatherSection: React.FC<WeatherSectionProps> = ({ cities }) => {
  const weatherData = useSelector((state: RootState) => state.weather.cities);

  const getWeatherIcon = (conditions: string) => {
    switch (conditions?.toLowerCase()) {
      case 'clear':
        return <Sun className="h-6 w-6" />;
      case 'clouds':
        return <Cloud className="h-6 w-6" />;
      case 'rain':
        return <CloudRain className="h-6 w-6" />;
      default:
        return <Cloud className="h-6 w-6" />;
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Weather Updates</h2>
      <div className="grid gap-4">
        {cities.map((city) => {
          const data = weatherData[city];
          return (
            <Card key={city}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{city}</CardTitle>
                {data?.conditions && getWeatherIcon(data.conditions)}
              </CardHeader>
              <CardContent>
                {data?.loading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : data?.error ? (
                  <p className="text-sm text-destructive">{data.error}</p>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{Math.round(data?.temperature || 0)}°C</div>
                    <p className="text-xs text-muted-foreground">
                      Humidity: {data?.humidity || 0}%
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherSection;