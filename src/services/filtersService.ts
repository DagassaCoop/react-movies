import {
  EFilterType,
  EFilterSection,
  IGenreAPI,
  IFiltersViewStructure,
  IFilter,
  TFilter,
  IReleaseDateTypeAPI,
} from '@/interfaces/filters';
import { v4 } from 'uuid';

export function createGenresFilters(apiGenres: Array<IGenreAPI>): Array<IFilter<IGenreAPI>> {
  const genres: Array<IFilter<IGenreAPI>> = apiGenres.map((genre) => {
    const genreFilter: IFilter<IGenreAPI> = {
      id: v4(),
      section: EFilterSection.genre,
      type: EFilterType.genre,
      data: genre,
      isActive: false,
    };

    return genreFilter;
  });

  return genres;
}

export function createReleaseDateTypesFilters(
  types: Array<IReleaseDateTypeAPI>,
): Array<IFilter<IReleaseDateTypeAPI>> {
  const releaseDates: Array<IFilter<IReleaseDateTypeAPI>> = types.map((type) => {
    return {
      id: v4(),
      section: EFilterSection.releaseDate,
      type: EFilterType.releaseDateType,
      isActive: false,
      data: {
        id: type.id,
        title: type.title,
        api: type.api,
      },
    };
  });

  return releaseDates;
}

export function checkIsActive(filters: IFiltersViewStructure): boolean {
  const activeGenres = filters[EFilterSection.genre].filter((genre) => genre.isActive);
  if (activeGenres) return true;

  return false;
}

export function getExistFilterById(obj: any, id: string): TFilter | undefined {
  if (isFilter(obj)) {
    if (obj.id === id) return obj as TFilter;
    return;
  }

  for (const key in obj) {
    const result = getExistFilterById(obj[key], id);
    if (result) return result;
  }

  function isFilter(obj: any): boolean {
    if (Array.isArray(obj)) return false;
    if (typeof obj !== 'object') return false;

    const keys = Object.keys(obj);

    if (!keys.includes('id') || !keys.includes('type') || !keys.includes('isActive')) return false;

    return true;
  }
}
