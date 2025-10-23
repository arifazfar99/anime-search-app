import { createSlice } from '@reduxjs/toolkit'
import { fetchAnimeBySearch, fetchAnimeDetails, fetchAnimeByPopular } from './animeThunks'
import type { Anime } from '@/types/anime'

interface AnimeState {
  animeList: Anime[];
  totalResults: number;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  selectedAnime: Anime | null
}

const initialState: AnimeState = {
  animeList: [],
  totalResults: 0,
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
  selectedAnime: null,
}

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selectedAnime = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Anime Search
      .addCase(fetchAnimeBySearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.animeList = action.payload.data;
        state.totalResults = action.payload.pagination.items.total;
        state.totalPages = action.payload.pagination.last_visible_page;
      })
      .addCase(fetchAnimeBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch anime.";
      })

      // Anime Details
      .addCase(fetchAnimeDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnimeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAnime = action.payload;
      })
      .addCase(fetchAnimeDetails.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch anime details.";
      })

      // Popular Anime
      .addCase(fetchAnimeByPopular.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnimeByPopular.fulfilled, (state, action) => {
        state.loading = false;
        state.animeList = action.payload.data;
        state.totalResults = action.payload.pagination.items.total;
        state.totalPages = action.payload.pagination.last_visible_page;
      })
      .addCase(fetchAnimeByPopular.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch top anime.";
      });
  },
});

export const { clearSelected } = animeSlice.actions;
export default animeSlice.reducer;