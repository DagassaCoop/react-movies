import React, { memo, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useLoaderData } from 'react-router-dom';

// Store
import { updateFiltersViewStructure } from '@/store/slices/filters.slice';

// Assets
import '@/assets/styles/pages/discover.scss';
import categoryMovies from '@/assets/data/categoryMovies.json';

// Components
import DiscoverFilters from '@/components/features/discover/DiscoverFilters.component';
import DiscoverResult from '@/components/features/discover/DiscoverResult.component';

// Interfaces
import { EMoviesListName, IMovies } from '@/interfaces/movies.interface';

// Hooks
import { useMovies } from '@/hooks/useMovies';
import discoverLoader from '@/router/loaders/discover.loader';
import { useQueryClient } from '@tanstack/react-query';

interface IDiscoverProps {
  moviesListName: EMoviesListName;
}

const Discover: React.FC<IDiscoverProps> = ({ moviesListName }) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient()

  const loadedData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof discoverLoader>>>;

  const isDiscoverActive = useAppSelector((state) => state.filters.isActive);
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
      isActive: isDiscoverActive,
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
    <div className='discover'>
      <h2 className='discover__title'>{title} Movies</h2>
      <div className='discover__filter'>
        <DiscoverFilters />
        <Button className='discover__btn' disabled={!readyForUpdate} onClick={handleSearchButton}>
          Search
        </Button>
      </div>
      <div className='discover__content'>
        <DiscoverResult movies={movies ? movies.results : loadedData.results} />
      </div>
    </div>
  );
};

export default memo(Discover);
