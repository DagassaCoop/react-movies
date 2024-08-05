import React, { useEffect, memo } from 'react';

// Hooks
import { useAppDispatch, useAppSelector } from '@/store/hooks';

// State
import { fetchGenres } from '@/store/slices/filters.slice';

// Assets
import '@/assets/styles/components/discover/filters/discoverFilter.scss';

// Components
import FilterButton from '../components/FilterButton.component';

// Interfaces
import { EFilterSection } from '@/interfaces/filters.interface';

const FilterGenres: React.FC = () => {
  const dispatch = useAppDispatch();
  const genres = useAppSelector(
    (state) => state.filters.filtersViewStructure[EFilterSection.genre],
  );

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  return (
    <div className='discover-filter discover-filter_genres'>
      <h3 className='discover-filter__title'>Genres</h3>
      <div className='discover-filter__btn-list'>
        {genres.map((genre) => {
          return <FilterButton filterData={genre} key={genre.id} />;
        })}
      </div>
    </div>
  );
};

export default memo(FilterGenres);
