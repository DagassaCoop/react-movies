import { IFiltersViewStructure, IGenreAPI } from '@/interfaces/filters';
import { EMoviesListName, IMovie, IMovies } from '@/interfaces/movies';
import { buildDiscoverQueryByFilters } from '@/services/tmdbService';
import axios from 'axios';

const tmdbApi = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

// CONTROLLERS

// export const getMovies = async (
//   listName: EMoviesListName,
//   filters?: IFiltersState,
// ): Promise<IMovies> => {
//   if (filters) {
//     return await getDiscoverMovies(filters);
//   } else {
//     return await getMoviesByListName(listName);
//   }
// };

// MOVIES API

export const getMoviesByListName = async (listName: EMoviesListName): Promise<IMovies> => {
  const response = await tmdbApi.get(`/movie/${EMoviesListName[listName]}`);
  return response.data;
};

export const getMovieById = async (id: string): Promise<IMovie> => {
  const response = await tmdbApi.get(`/movie/${id}`);
  return response.data;
};

// GENRES API

export const getMovieGenres = async (): Promise<Array<IGenreAPI>> => {
  const response = await tmdbApi.get('genre/movie/list');
  return response.data.genres;
};

// DISCOVER API

export const getDiscoverMovies = async (filters: IFiltersViewStructure): Promise<IMovies> => {
  const query = `/discover/movie?${buildDiscoverQueryByFilters(filters)}`;
  // console.log(query);
  const response = await tmdbApi.get(query);
  return response.data;
};
