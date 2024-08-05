import { IMovie } from '@/interfaces/movies.interface';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IFavoritesStore {
  movies: Array<IMovie>;
}

const initialState: IFavoritesStore = {
  movies: [],
};

export const favorites = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavoriteMovie(state, action: PayloadAction<IMovie>) {
      state.movies.push(action.payload);
    },
    removeFavoriteMovie(state, action: PayloadAction<number>) {
      const movieIndex = state.movies.findIndex((m) => m.id === action.payload);
      if (movieIndex !== -1) state.movies.splice(movieIndex, 1);
    },
  },
});

export const { addFavoriteMovie, removeFavoriteMovie } = favorites.actions;

export default favorites.reducer;
