import React, { memo } from 'react';

// Interfaces
import { IMovie } from '@/interfaces/movies.interface';

// Components
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

export default memo(MoviesList);
