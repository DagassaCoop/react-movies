import { Route, createBrowserRouter, createRoutesFromElements, redirect } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import RootLayout from '@/components/layouts/RootLayout.tsx';

// Pages
import HomePage from '@/components/pages/HomePage.tsx';
import CategoriesPage from '@/components/pages/CategoriesPage.tsx';
// import MediaPage from '@/components/pages/MediaPage.tsx';
import MyFavoritesPage from '@/components/pages/MyFavoritesPage.tsx';
import ErrorPage from '@/components/pages/ErrorPage.tsx';
import SearchPage from '@/components/pages/SearchPage.tsx';

// Loaders
import categoryLoader from './loaders/categoryLoader.ts';
import searchLoader from './loaders/searchLoader.ts';

// Interfaces
import { ECategoryMovieType, ECategoryTVSerieType } from '@/interfaces/categories.ts';

// Services
import { getMoviesListEnums } from '@/services/moviesService.ts';

const queryClient = new QueryClient();

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      <Route
        path='movies'
        loader={() => redirect(`/categories/${ECategoryMovieType[ECategoryMovieType.Movies]}`)}
      />
      <Route
        path='tv-series'
        loader={() =>
          redirect(`/categories/${ECategoryTVSerieType[ECategoryTVSerieType['TV Series']]}`)
        }
      />
      <Route path='categories' loader={categoryLoader}>
        <Route path=':categoryType' element={<CategoriesPage />} loader={categoryLoader} />
      </Route>
      {/* <Route path='media' element={<MediaPage />} /> */}
      <Route path='my-favorite' element={<MyFavoritesPage />} />
      {getMoviesListEnums().map((name) => {
        return (
          <Route
            key={name}
            path={`search/${name}`}
            element={<SearchPage moviesListName={name} />}
            loader={() => searchLoader(queryClient)(name)}
          />
        );
      })}
    </Route>,
  ),
);

export default routes;
