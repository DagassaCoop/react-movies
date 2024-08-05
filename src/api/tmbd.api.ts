import {
  ICountryAPI,
  IFiltersViewStructure,
  IGenreAPI,
  ILanguageAPI,
} from '@/interfaces/filters.interface';
import { IImagesResponse } from '@/interfaces/images.interface';
import { EMoviesListName, IMovie, IMovies } from '@/interfaces/movies.interface';
import { buildDiscoverQueryByFilters } from '@/services/tmdb.service';
import axios from 'axios';

const tmdbApi = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

// MOVIES API

export const getMoviesByListName = async (listName: EMoviesListName): Promise<IMovies> => {
  const response = await tmdbApi.get(`/movie/${EMoviesListName[listName]}`);
  return response.data;
};

export const getMovieById = async (id: string): Promise<IMovie> => {
  const response = await tmdbApi.get(`/movie/${id}`);
  return response.data;
};

export const getMoviesImagesById = async (id: string): Promise<IImagesResponse> => {
  const response = await tmdbApi.get(`movie/${id}/images`)
  return response.data;
}

// GENRES API

export const getMovieGenres = async (): Promise<Array<IGenreAPI>> => {
  const response = await tmdbApi.get('genre/movie/list');
  return response.data.genres;
};

// DISCOVER API

export const getDiscoverMovies = async (filters: IFiltersViewStructure): Promise<IMovies> => {
  const query = `/discover/movie?${buildDiscoverQueryByFilters(filters)}`;
  const response = await tmdbApi.get(query);
  return response.data;
};

// CONFIGURATION API

export const getCountries = async (): Promise<ICountryAPI[]> => {
  const response = await tmdbApi.get('configuration/countries');
  return response.data;
};

export const getLanguages = async (): Promise<ILanguageAPI[]> => {
  const response = await tmdbApi.get('configuration/languages');
  return response.data;
};
