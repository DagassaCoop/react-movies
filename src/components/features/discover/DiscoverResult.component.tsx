import React, { memo } from 'react';

// Assets
import '@/assets/styles/components/discover/discoverResult.scss';

// Interfaces
import { IMovie } from '@/interfaces/movies.interface';

// Components
import ItemPreview from '@/components/shared/ItemPreview.component';

interface IDiscoverResultProps {
  movies: IMovie[];
}

const DiscoverResult: React.FC<IDiscoverResultProps> = ({ movies }) => {
  return (
    <div className='discover-result'>
      {movies.map((movie) => {
        return <ItemPreview key={movie.id} item={movie} itemType='movie' />;
      })}
    </div>
  );
};

export default memo(DiscoverResult);
