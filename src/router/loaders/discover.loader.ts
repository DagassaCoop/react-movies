import { getMoviesByListName } from '@/api/tmbd.api';
import { EMoviesListName, IMovies } from '@/interfaces/movies.interface';
import { queryOptions, QueryClient } from '@tanstack/react-query';

const discoverDetailQuery = (name: EMoviesListName) => {
  return queryOptions({
    queryKey: ['movies', name],
    queryFn: () => getMoviesByListName(name),
  });
};

const discoverLoader =
  (queryClient: QueryClient) =>
  async (name: EMoviesListName): Promise<IMovies> => {
    const query = discoverDetailQuery(name);
    // ⬇️ return data or fetch it
    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
  };

export default discoverLoader;
