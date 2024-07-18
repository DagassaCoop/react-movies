import { IMovies } from './movies';

export enum ECategoryDefaultType {
  'Genres',
  'Peoples',
  'Countries',
}

export enum ECategoryMovieType {
  'Movies',
}

export enum ECategoryTVSerieType {
  'TV Series',
}

export interface ICategoriesLoaderDataOutput {
  data: IMovies | Array<any>;
  type: string;
}

export type ICategoriesLoaderOutput = ICategoriesLoaderDataOutput | Response | null;
