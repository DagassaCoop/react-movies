import React from 'react';
import '@/assets/styles/components/search/searchResult.scss';

// interfaces
import { IMovie } from '@/interfaces/movies';
import SearchResultItem from './result/SearchResultItem';

interface ISearchResultProps {
  movies: IMovie[];
}

const SearchResult: React.FC<ISearchResultProps> = ({ movies }) => {
  return (
    <div className='search-result'>
      {movies.map((movie) => {
        return <SearchResultItem key={movie.id} movie={movie} />;
      })}
    </div>
  );
};

export default SearchResult;
