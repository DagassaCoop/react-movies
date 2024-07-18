import React, { useEffect } from 'react';
import * as RBS from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { setReadyStatus } from '@/store/states/filtersSlice';

// Assets
import '@/assets/styles/components/search/searchFilters.scss';

// Components
import SearchFilterGenres from './filters/SearchFilterGenres';
import SearchFilterReleaseDate from './filters/SearchFilterReleaseDate';

const SearchFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const filterUpdates = useAppSelector((state) => state.filters.filtersUpdates);

  const decoratedOnClick = RBS.useAccordionButton('0');

  useEffect(() => {
    if (Object.keys(filterUpdates).length !== 0) {
      dispatch(setReadyStatus(true));
    } else {
      dispatch(setReadyStatus(false));
    }
  }, [filterUpdates]);

  return (
    <RBS.Accordion className='search-filters'>
      <RBS.Accordion.Item eventKey='0'>
        <RBS.AccordionHeader onClick={decoratedOnClick}>Filters</RBS.AccordionHeader>
        <RBS.AccordionBody>
          <SearchFilterReleaseDate />
          <SearchFilterGenres />
        </RBS.AccordionBody>
      </RBS.Accordion.Item>
    </RBS.Accordion>
  );
};

export default SearchFilters;
