import { EMoviesListName } from '@/interfaces/movies.interface';

export function getMoviesListEnums(): Array<EMoviesListName> {
  const names = Object.keys(EMoviesListName);
  names.length = names.length / 2;
  return names as unknown as Array<EMoviesListName>;
}
