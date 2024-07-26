import React, { useEffect, memo } from 'react';

// Hooks
import { useAppDispatch, useAppSelector } from '@/hooks/store';

// State
import { fetchGenres } from '@/store/states/filtersSlice';

// Assets
import '@/assets/styles/components/search/filters/searchFilter.scss';

// Components
import SearchFilterButton from '../components/SearchFilterButton';

// Interfaces
import { EFilterSection } from '@/interfaces/filters';

const SearchFilterGenres: React.FC = () => {
  const dispatch = useAppDispatch();
  const genres = useAppSelector(
    (state) => state.filters.filtersViewStructure[EFilterSection.genre],
  );

  useEffect(() => {
    dispatch(fetchGenres());
  }, []);

  return (
    <div className='search-filter search-filter_genres'>
      <h3 className='search-filter__title'>Genres</h3>
      <div className='search-filter__btn-list'>
        {genres.map((genre) => {
          return <SearchFilterButton filterData={genre} key={genre.id} />;
        })}
      </div>
    </div>
  );
};

export default memo(SearchFilterGenres);