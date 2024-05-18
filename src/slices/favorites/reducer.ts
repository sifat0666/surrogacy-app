import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { favoritesAPI } from '@/services/favorites/favorites-api';

export interface FavoritesState {
  favorites: string[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      favoritesAPI.endpoints.fetchFavorites.matchFulfilled,
      (state, action) => {
        state.favorites = action.payload as string[];
      }
    );
  },
});

export const { setFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;