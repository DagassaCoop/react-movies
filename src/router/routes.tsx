import { RouteObject, redirect } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';


// Root
import App from '@/App.tsx';

// Pages
import HomePage from '@/pages/Home/Home.page.tsx';
import CategoriesPage from '@/pages/Categories.page.tsx';
import MyFavoritesPage from '@/pages/MyFavorites.page.tsx';
import ErrorPage from '@/pages/Error.page.tsx';
import DiscoverPage from '@/pages/Discover.page.tsx';

// Loaders
import categoryLoader from './loaders/category.loader.ts';
import discoverLoader from './loaders/discover.loader.ts';
import homeLoader from './loaders/home.loader.ts';

// Interfaces
import { ECategoryMovieType, ECategoryTVSerieType } from '@/interfaces/categories.interface.ts';

// Services
import { getMoviesListEnums } from '@/services/movies.service.ts';

const queryClient = new QueryClient();

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: homeLoader },
      { path: 'movies', loader: () => redirect(`/categories/${ECategoryMovieType[ECategoryMovieType.Movies]}`) },
      { path: 'tv-series', loader: () => redirect(`/categories/${ECategoryTVSerieType[ECategoryTVSerieType['TV Series']]}`) },
      { path: 'categories/:categoryType', element: <CategoriesPage />, loader: categoryLoader },
      { path: 'my-favorite', element: <MyFavoritesPage /> },
      ...buildMovieListRouteObject(),
    ]
  }
]

function buildMovieListRouteObject(): RouteObject[] {
  return getMoviesListEnums().map(name => {
    return { path: `discover/${name}`, 
    element: <DiscoverPage moviesListName={name} />,
    loader: () => discoverLoader(queryClient)(name)}
  })
}

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<RootLayout />} errorElement={<ErrorPage />}>
//       <Route index element={<HomePage />} loader={homeLoader}/>
//       <Route
//         path='movies'
//         loader={() => redirect(`/categories/${ECategoryMovieType[ECategoryMovieType.Movies]}`)}
//       />
//       <Route
//         path='tv-series'
//         loader={() =>
//           redirect(`/categories/${ECategoryTVSerieType[ECategoryTVSerieType['TV Series']]}`)
//         }
//       />
//       <Route path='categories' loader={categoryLoader}>
//         <Route path=':categoryType' element={<CategoriesPage />} loader={categoryLoader} />
//       </Route>
//       <Route path='my-favorite' element={<MyFavoritesPage />} />
//       {getMoviesListEnums().map((name) => {
//         return (
//           <Route
//             key={name}
//             path={`discover/${name}`}
//             element={<DiscoverPage moviesListName={name} />}
//             loader={() => discoverLoader(queryClient)(name)}
//           />
//         );
//       })}
//     </Route>,
//   ),
// );

// const router = createBrowserRouter(routes)

export default routes;
