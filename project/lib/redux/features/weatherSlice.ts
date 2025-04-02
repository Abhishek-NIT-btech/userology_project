import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface WeatherState {
  cities: {
    [key: string]: {
      temperature: number;
      humidity: number;
      conditions: string;
      loading: boolean;
      error: string | null;
    };
  };
}

const initialState: WeatherState = {
  cities: {},
};

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city: string) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
    );
    const data = await response.json();
    return {
      city,
      data: {
        temperature: data.main.temp,
        humidity: data.main.humidity,
        conditions: data.weather[0].main,
      },
    };
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state, action) => {
        const city = action.meta.arg;
        state.cities[city] = {
          ...state.cities[city],
          loading: true,
          error: null,
        };
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        const { city, data } = action.payload;
        state.cities[city] = {
          ...data,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        const city = action.meta.arg;
        state.cities[city] = {
          ...state.cities[city],
          loading: false,
          error: action.error.message || 'Failed to fetch weather data',
        };
      });
  },
});

export default weatherSlice.reducer;