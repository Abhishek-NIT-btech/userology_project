import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface CryptoState {
  coins: {
    [key: string]: {
      price: number;
      change24h: number;
      marketCap: number;
      loading: boolean;
      error: string | null;
    };
  };
}

const initialState: CryptoState = {
  coins: {},
};

export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async (coinId: string) => {
    const response = await fetch(
      `https://api.coincap.io/v2/assets/${coinId}`
    );
    const data = await response.json();
    return {
      coinId,
      data: {
        price: parseFloat(data.data.priceUsd),
        change24h: parseFloat(data.data.changePercent24Hr),
        marketCap: parseFloat(data.data.marketCapUsd),
      },
    };
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCryptoPrice: (state, action) => {
      const { coinId, price } = action.payload;
      if (state.coins[coinId]) {
        state.coins[coinId].price = price;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state, action) => {
        const coinId = action.meta.arg;
        state.coins[coinId] = {
          ...state.coins[coinId],
          loading: true,
          error: null,
        };
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        const { coinId, data } = action.payload;
        state.coins[coinId] = {
          ...data,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        const coinId = action.meta.arg;
        state.coins[coinId] = {
          ...state.coins[coinId],
          loading: false,
          error: action.error.message || 'Failed to fetch crypto data',
        };
      });
  },
});

export const { updateCryptoPrice } = cryptoSlice.actions;
export default cryptoSlice.reducer;