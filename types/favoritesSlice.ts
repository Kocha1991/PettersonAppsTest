import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Photo } from './types';

interface FavoritesState {
  favorites: Photo[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Photo>) {
      state.favorites.push(action.payload);
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(photo => photo.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
