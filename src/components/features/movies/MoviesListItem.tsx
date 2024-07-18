import React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { addFavoriteMovie, removeFavoriteMovie } from '@/store/states/favoritesSlice';

const MoviesListItem: React.FC<{ movie: any }> = ({ movie }) => {
  const isFavor = Boolean(
    useAppSelector((state) => state.favorites.movies.find((m) => m.id === movie.id)),
  );
  const dispatch = useAppDispatch();

  const addMovieHandler = () => {
    if (isFavor) return;
    dispatch(addFavoriteMovie(movie));
  };

  const removeMovieHandler = () => {
    dispatch(removeFavoriteMovie(movie.id));
  };

  return (
    <div className='movies-list-item'>
      {movie.title}
      <button onClick={addMovieHandler}>Add to Favorite</button>
      {isFavor ? 'Favorite' : ''}
      {isFavor ? <button onClick={removeMovieHandler}>Remove from Favorite</button> : ''}
    </div>
  );
};

export default MoviesListItem;
