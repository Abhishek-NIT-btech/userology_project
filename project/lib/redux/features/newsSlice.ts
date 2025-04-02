import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
}

export interface NewsState {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
};

export const fetchNewsData = createAsyncThunk(
  'news/fetchNewsData',
  async () => {
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_NEWSDATA_API_KEY}&q=cryptocurrency&language=en`
    );
    const data = await response.json();
    return data.results.slice(0, 5).map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.link,
      publishedAt: article.pubDate,
    }));
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsData.fulfilled, (state, action) => {
        state.articles = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch news data';
      });
  },
});

export default newsSlice.reducer;