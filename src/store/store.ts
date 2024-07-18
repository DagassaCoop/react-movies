import { configureStore } from '@reduxjs/toolkit';

import favoritesReducer from '@/store/states/favoritesSlice';
import categoriesReducer from '@/store/states/categoriesSlice';
import filtersReducer from '@/store/states/filtersSlice';

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
