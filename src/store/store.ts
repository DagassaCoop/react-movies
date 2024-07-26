import { configureStore } from '@reduxjs/toolkit';

import favoritesReducer from '@/store/states/favorites.slice';
import categoriesReducer from '@/store/states/categories.slice';
import filtersReducer from '@/store/states/filters.slice';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    categories: categoriesReducer,
    filters: filtersReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export default store;
