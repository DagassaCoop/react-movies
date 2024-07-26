// Enums

export enum EFilterSection {
  genre,
  releaseDate,
  language,
  voteCount,
  voteAverage,
}

export enum EFilterType {
  genre,
  releaseDate,
  country,
  releaseDateType,
  minInfo,
  language,
  voteCount,
  voteAverage,
}

export enum EReleaseDateAPIType {
  gte,
  lte,
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

export interface ILanguageAPI {
  iso_639_1: string;
  english_name: string;
  name: string;
}

// Subtypes

export interface IReleaseDate {
  id: string;
  title: string;
  date: string;
  api: EReleaseDateAPIType;
}

export interface IMinInfo {
  id: string;
  title: string;
}

export interface ISlider {
  id: string;
  value: number;
}

export interface ISliderDouble {
  id: string;
  value: number[];
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
  | IGenreAPI
  | IReleaseDateTypeAPI
  | IMinInfo
  | ICountryAPI
  | IReleaseDate
  | ILanguageAPI
  | ISlider
  | ISliderDouble
>;

// Filter State

export interface IFiltersViewStructure {
  [EFilterSection.genre]: Array<IFilter<IGenreAPI>>;
  [EFilterSection.releaseDate]: {
    allReleases: IFilter<IMinInfo>;
    allCountries: IFilter<IMinInfo>;
    country: IFilter<ICountryAPI>;
    releaseDateTypes: Array<IFilter<IReleaseDateTypeAPI>>;
    releaseFrom: IFilter<IReleaseDate>;
    releaseTo: IFilter<IReleaseDate>;
  };
  [EFilterSection.language]: IFilter<ILanguageAPI>;
  [EFilterSection.voteCount]: IFilter<ISliderDouble>;
  [EFilterSection.voteAverage]: IFilter<ISlider>;
}

export interface IFiltersUpdates {
  [key: string]: TFilter;
}
