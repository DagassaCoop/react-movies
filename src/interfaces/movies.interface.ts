export enum EMoviesListName {
  'now_playing',
  'popular',
  'top_rated',
  'upcoming',
}

export interface ICategoriesMovies {
  id: string;
  title: string;
  api: EMoviesListName;
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovies {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
