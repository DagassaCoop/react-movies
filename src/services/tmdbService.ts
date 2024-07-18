import {
  EFilterSection,
  IFilter,
  IFiltersViewStructure,
  IGenreAPI,
  TFilter,
} from '@/interfaces/filters';

export const buildDiscoverQueryByFilters = (filters: IFiltersViewStructure): string => {
  let query = '';

  // Build genres query
  const activeGenres = filters[EFilterSection.genre].filter((genre) => genre.isActive);
  if (activeGenres) {
    query += getQueryForFilterType(EFilterSection.genre, activeGenres);
  }

  // Remove last &
  if (query) query = query.slice(0, -1);

  return query;
};

const getQueryForFilterType = (type: EFilterSection, filters: TFilter[]): string => {
  switch (type) {
    case EFilterSection.genre:
      return `with_genres=${(filters as IFilter<IGenreAPI>[]).map((f) => f.data.id).join(',')}&`;
    default:
      return '';
  }
};
