import axios from 'axios';
import { DefinedInitialDataOptions, UseQueryResult, useQuery, useQueryClient } from '@tanstack/react-query';

// API
import { getMoviesByListName, getDiscoverMovies } from '@/api/tmbd.api';

// Interfaces
import { IFiltersViewStructure } from '@/interfaces/filters.interface';
import { EMoviesListName, IMovies } from '@/interfaces/movies.interface';

export const useMovies = (
  options: DefinedInitialDataOptions<IMovies>,
  args: {
    listName: EMoviesListName;
    isActive: boolean;
    filters: IFiltersViewStructure;
  },
): UseQueryResult<IMovies> => {
  const { listName, isActive, filters } = args;

  const movies = useQuery<IMovies>({
    ...options,
    queryKey: ['movies', filters],
    queryFn: () => (isActive ? getDiscoverMovies(filters) : getMoviesByListName(listName)),
  });

  if (movies.isError) {
    if (axios.isAxiosError(movies.error)) {
      console.log('tmbd.hook.ts > useMovies > axios error >> ', movies.error.message);
      console.error(movies.error.response);
    } else {
      console.log('tmbd.hook.ts > useMovies > error >> ', movies.error.message);
    }
  }

  useQueryClient().setQueryData(['movies'], (oldData: any) => ({ ...oldData, ...movies.data }));

  return movies;
};
