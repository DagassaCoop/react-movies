import React from 'react';

import { IMovie } from '@/interfaces/movies';

import MoviesListItem from './MoviesListItem';

interface IMoviesListProps {
  movies: Array<IMovie>;
}

const MoviesList: React.FC<IMoviesListProps> = ({ movies }) => {
  return (
    <div className='movies-list'>
      {movies.map((movie) => (
        <MoviesListItem key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesList;
