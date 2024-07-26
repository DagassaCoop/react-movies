import { Route, createBrowserRouter, createRoutesFromElements, redirect } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import RootLayout from '@/components/layouts/Root.layout.tsx';

// Pages
import HomePage from '@/components/pages/Home.page.tsx';
import CategoriesPage from '@/components/pages/Categories.page.tsx';
import MyFavoritesPage from '@/components/pages/MyFavorites.page.tsx';
import ErrorPage from '@/components/pages/Error.page.tsx';
import SearchPage from '@/components/pages/Search.page.tsx';

// Loaders
import categoryLoader from './loaders/category.loader.ts';
import searchLoader from './loaders/search.loader.ts';

// Interfaces
import { ECategoryMovieType, ECategoryTVSerieType } from '@/interfaces/categories.interface.ts';

// Services
import { getMoviesListEnums } from '@/services/movies.service.ts';

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
