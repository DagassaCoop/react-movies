// Enums

export enum EFilterSection {
  genre,
  releaseDate,
}

export enum EFilterType {
  genre,
  releaseDate,
  country,
  releaseDateType,
  minInfo,
}

// API

export interface IGenreAPI {
  id: number;
  name: string;
}

export interface IReleaseDateTypeAPI {
  id: string;
  title: string;
  api: number;
}

export interface ICountryAPI {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

// Subtypes

export interface IReleaseDate {
  id: string;
  title: string;
  date: string;
}

export interface IMinInfo {
  id: string;
  title: string;
}

// Filter

export interface IFilter<T> {
  id: string;
  section: EFilterSection;
  type: EFilterType;
  isActive: boolean;
  data: T;
}

export type TFilter = IFilter<
  IGenreAPI | IReleaseDateTypeAPI | IMinInfo | ICountryAPI | IReleaseDate
>;

// Filter State

export interface IFiltersViewStructure {
  [EFilterSection.genre]: Array<IFilter<IGenreAPI>>;
  [EFilterSection.releaseDate]: {
    allReleases: IFilter<IMinInfo>;
    allCountries: IFilter<IMinInfo>;
    country?: IFilter<ICountryAPI>;
    releaseDateTypes: Array<IFilter<IReleaseDateTypeAPI>>;
    releaseFrom: IFilter<IReleaseDate>;
    releaseTo: IFilter<IReleaseDate>;
  };
}

export interface IFiltersUpdates {
  [key: string]: TFilter;
}
