import React, { memo } from 'react';

// Assets
import '@/assets/styles/components/search/searchResult.scss';

// Interfaces
import { IMovie } from '@/interfaces/movies.interface';

// Components
import ResultItem from './result/ResultItem.component';

interface ISearchResultProps {
  movies: IMovie[];
}

const SearchResult: React.FC<ISearchResultProps> = ({ movies }) => {
  return (
    <div className='search-result'>
      {movies.map((movie) => {
        return <ResultItem key={movie.id} movie={movie} />;
      })}
    </div>
  );
};

export default memo(SearchResult);
