import { configureStore } from '@reduxjs/toolkit';

import favoritesReducer from '@/store/slices/favorites.slice';
import categoriesReducer from '@/store/slices/categories.slice';
import filtersReducer from '@/store/slices/filters.slice';

export const createStore = () => configureStore({
  reducer: {
    favorites: favoritesReducer,
    categories: categoriesReducer,
    filters: filtersReducer,
  },
});

export const store = createStore();

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
