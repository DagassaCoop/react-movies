import {
  EFilterSection,
  EFilterType,
  EReleaseDateAPIType,
  ICountryAPI,
  IFilter,
  IFiltersViewStructure,
  IGenreAPI,
  ILanguageAPI,
  IReleaseDate,
  IReleaseDateTypeAPI,
  ISlider,
  ISliderDouble,
  TFilter,
} from '@/interfaces/filters';

// TODO: Move builders to personalized function for each filter section
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

  // Build language query
  const language = filters[EFilterSection.language];
  if (language.language.isActive) query += getQueryForFilterType(EFilterType.language, [language.language]);

  // Build vote count query
  const voteCount = filters[EFilterSection.voteCount];
  if (voteCount.isActive) query += getQueryForFilterType(EFilterType.voteCount, [voteCount])

  // Build vote average query
  const voteAverage = filters[EFilterSection.voteAverage];
  if (voteAverage.isActive) query += getQueryForFilterType(EFilterType.voteAverage, [voteAverage])

  // Remove last &
  if (query) query = query.slice(0, -1);

  console.log('tmdbService > buildDiscoverQueryByFilters > query >> ', query);

  return query;
};

const getQueryForFilterType = (type: EFilterType, filters: TFilter[]): string => {
  switch (type) {
    case EFilterType.genre:
      const filterGenre = filters as IFilter<IGenreAPI>[]
      return `with_genres=${filterGenre.map((f) => f.data.id).join(',')}&`;
    case EFilterType.country:
      const filterCountry = filters as [IFilter<ICountryAPI>]
      return `with_origin_country${filterCountry[0].data.iso_3166_1}&`;
    case EFilterType.releaseDate:
      const filterReleaseDate = filters as [IFilter<IReleaseDate>]
      return `release_date.${EReleaseDateAPIType[filterReleaseDate[0].data.api]}=${filterReleaseDate[0].data.date}&`
    case EFilterType.releaseDateType:
      const filterReleaseDateType = filters as IFilter<IReleaseDateTypeAPI>[]
      return `with_release_type=${filterReleaseDateType.map((f => f.data.api)).join(',')}&`;
    case EFilterType.language: 
      const filterLanguage = filters[0] as IFilter<ILanguageAPI>
      return `with_original_language=${filterLanguage.data.iso_639_1}&`
    case EFilterType.voteCount:
      const filterVoteCount = filters[0] as IFilter<ISliderDouble>
      return `vote_count.gte=${filterVoteCount.data.value[0]}&vote_count.lte=${filterVoteCount.data.value[1]}&` 
    case EFilterType.voteAverage:
      const filterVoteAverage = filters[0] as IFilter<ISlider>
      return `vote_average.gte=${100 / 500 * filterVoteAverage.data.value / 10}&`
    default:
      return '';
  }
};
