import {
  EFilterSection,
  EFilterType,
  EReleaseDateAPIType,
  ICountryAPI,
  IFilter,
  IFiltersViewStructure,
  IGenreAPI,
  IReleaseDate,
  IReleaseDateTypeAPI,
  TFilter,
} from '@/interfaces/filters';

export const buildDiscoverQueryByFilters = (filters: IFiltersViewStructure): string => {
  let query = '';

  // Build genres query
  const activeGenres = filters[EFilterSection.genre].filter((genre) => genre.isActive);
  if (activeGenres.length) {
    query += getQueryForFilterType(EFilterType.genre, activeGenres);
  }

  // Build release date query
  const releaseDate = filters[EFilterSection.releaseDate]
  if (!releaseDate.allReleases.isActive) {
    if (!releaseDate.allCountries.isActive && releaseDate.country) {
      query += getQueryForFilterType(EFilterType.country, [releaseDate.country]);
    }

    const releaseDateTypes = releaseDate.releaseDateTypes.filter((type) => type.isActive);
    if (releaseDateTypes.length) {
      query += getQueryForFilterType(EFilterType.releaseDateType, releaseDateTypes);
    }
  }
  if (releaseDate.releaseFrom.isActive) query += getQueryForFilterType(EFilterType.releaseDate, [releaseDate.releaseFrom]);
  if (releaseDate.releaseTo.isActive) query += getQueryForFilterType(EFilterType.releaseDate, [releaseDate.releaseTo]);


  // Remove last &
  if (query) query = query.slice(0, -1);

  console.log('tmdbService > buildDiscoverQueryByFilters > query >> ', query);

  return query;
};

const getQueryForFilterType = (type: EFilterType, filters: TFilter[]): string => {
  switch (type) {
    case EFilterType.genre:
      return `with_genres=${(filters as IFilter<IGenreAPI>[]).map((f) => f.data.id).join(',')}&`;
    case EFilterType.country:
      return `with_origin_country${(filters as [IFilter<ICountryAPI>])[0].data.iso_3166_1}&`;
    case EFilterType.releaseDate:
      return `release_date.${EReleaseDateAPIType[(filters as [IFilter<IReleaseDate>])[0].data.api]}=${(filters as [IFilter<IReleaseDate>])[0].data.date}&`
    case EFilterType.releaseDateType:
      return `with_release_type=${(filters as IFilter<IReleaseDateTypeAPI>[]).map((f => f.data.api)).join(',')}&`;
    default:
      return '';
  }
};
