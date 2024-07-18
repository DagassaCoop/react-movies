import { getMoviesByListName } from '@/api/tmbd';
import { EMoviesListName, IMovies } from '@/interfaces/movies';
import { queryOptions, QueryClient } from '@tanstack/react-query';

const searchDetailQuery = (name: EMoviesListName) => {
  return queryOptions({
    queryKey: ['movies', name],
    queryFn: () => getMoviesByListName(name),
  });
};

const searchLoader =
  (queryClient: QueryClient) =>
  async (name: EMoviesListName): Promise<IMovies> => {
    const query = searchDetailQuery(name);
    // ⬇️ return data or fetch it
    return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
  };

export default searchLoader;
