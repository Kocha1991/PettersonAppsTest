import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Photo } from './types';

const saveFavorites = async (favorites: Photo[]) => {
  try {
    const jsonValue = JSON.stringify(favorites);
    await AsyncStorage.setItem('favorites', jsonValue);
  } catch (e) {
    console.error('Failed to save favorites:', e);
  }
};

const saveDislikedPhotos = async (dislikedPhotos: number[]) => {
  try {
    const jsonValue = JSON.stringify(dislikedPhotos);
    await AsyncStorage.setItem('dislikedPhotos', jsonValue);
  } catch (e) {
    console.error('Failed to save disliked photos:', e);
  }
};

interface FavoritesState {
  favorites: Photo[];
  dislikedPhotos: number[];
}

const initialState: FavoritesState = {
  favorites: [],
  dislikedPhotos: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<Photo[]>) {
      state.favorites = action.payload;
      saveFavorites(action.payload); 
    },
    addFavorite(state, action: PayloadAction<Photo>) {
      state.favorites.push(action.payload);
      saveFavorites(state.favorites);
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.filter(photo => photo.id !== action.payload);
      saveFavorites(state.favorites);
    },
    addDislikedPhoto(state, action: PayloadAction<number>) {
      if (!state.dislikedPhotos.includes(action.payload)) {
        state.dislikedPhotos.push(action.payload);
        saveDislikedPhotos(state.dislikedPhotos);
      }
    },
    removeDislikedPhoto(state, action: PayloadAction<number>) {
      state.dislikedPhotos = state.dislikedPhotos.filter(id => id !== action.payload);
      saveDislikedPhotos(state.dislikedPhotos);
    },
    setDislikedPhotos(state, action: PayloadAction<number[]>) {
      state.dislikedPhotos = action.payload;
      saveDislikedPhotos(action.payload);
    }
  },
});

export const { setFavorites, addFavorite, removeFavorite, addDislikedPhoto, removeDislikedPhoto, setDislikedPhotos } = favoritesSlice.actions;
export default favoritesSlice.reducer;
