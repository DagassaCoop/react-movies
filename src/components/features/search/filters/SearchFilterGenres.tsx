import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { fetchGenres } from '@/store/states/filtersSlice';

// Assets
import '@/assets/styles/components/search/filters/searchFilter.scss';

// Components
import SearchFilterButton from './SearchFilterButton';
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

export default SearchFilterGenres;
