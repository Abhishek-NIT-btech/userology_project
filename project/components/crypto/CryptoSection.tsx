import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Loader2 } from 'lucide-react';

interface CryptoSectionProps {
  cryptos: string[];
}

const CryptoSection: React.FC<CryptoSectionProps> = ({ cryptos }) => {
  const cryptoData = useSelector((state: RootState) => state.crypto.coins);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatChange = (change: number) => {
    return change.toFixed(2) + '%';
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Crypto Prices</h2>
      <div className="grid gap-4">
        {cryptos.map((crypto) => {
          const data = cryptoData[crypto];
          return (
            <Card key={crypto}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium capitalize">{crypto}</CardTitle>
                {data?.change24h && (
                  data.change24h > 0 ? 
                    <TrendingUp className="h-4 w-4 text-green-500" /> :
                    <TrendingDown className="h-4 w-4 text-red-500" />
                )}
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
                    <div className="text-2xl font-bold">{formatPrice(data?.price || 0)}</div>
                    <p className={`text-xs ${data?.change24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {formatChange(data?.change24h || 0)}
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

export default CryptoSection;