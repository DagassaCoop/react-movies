import React, { memo } from 'react';

// Assets
import '@/assets/styles/components/search/searchResult.scss';

// Interfaces
import { IMovie } from '@/interfaces/movies';

// Components
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

export default memo(SearchResult);
