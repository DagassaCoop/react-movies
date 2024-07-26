import React, { memo, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '@/hooks/store.hook';
import { useLoaderData } from 'react-router-dom';

// Store
import { updateFiltersViewStructure } from '@/store/states/filters.slice';

// Assets
import '@/assets/styles/pages/search.scss';
import categoryMovies from '@/assets/config/categoryMovies.json';

// Components
import SearchFilters from '../features/search/SearchFilters.component';
import SearchResult from '../features/search/SearchResult.component';

// Interfaces
import { EMoviesListName, IMovies } from '@/interfaces/movies.interface';

// Hooks
import { useMovies } from '@/hooks/tmbd.hook';
import searchLoader from '@/router/loaders/search.loader';

// Query Client
import { queryClient } from '@/main';

interface ISearchProps {
  moviesListName: EMoviesListName;
}

const Search: React.FC<ISearchProps> = ({ moviesListName }) => {
  const dispatch = useAppDispatch();

  const loadedData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof searchLoader>>>;

  const isSearchActive = useAppSelector((state) => state.filters.isActive);
  const filters = useAppSelector((state) => state.filters.filtersViewStructure);

  const { data: movies } = useMovies(
    {
      initialData: () => {
        const movies = queryClient.getQueryData<IMovies>(['movies']);
        return movies ?? loadedData;
      },
      queryKey: [],
    },
    {
      listName: moviesListName,
      isActive: isSearchActive,
      filters,
    },
  );

  const title = useMemo(
    () =>
      categoryMovies.categories.find((category) => category.api === Number(moviesListName))
        ?.title ?? 'N/A',
    [categoryMovies],
  );

  const handleSearchButton = () => {
    dispatch(updateFiltersViewStructure());
  };

  const readyForUpdate = useAppSelector((state) => state.filters.readyForUpdate);

  return (
    <div className='search'>
      <h2 className='search__title'>{title} Movies</h2>
      <div className='search__filter'>
        <SearchFilters />
        <Button className='search__btn' disabled={!readyForUpdate} onClick={handleSearchButton}>
          Search
        </Button>
      </div>
      <div className='search__content'>
        <SearchResult movies={movies ? movies.results : loadedData.results} />
      </div>
    </div>
  );
};

export default memo(Search);