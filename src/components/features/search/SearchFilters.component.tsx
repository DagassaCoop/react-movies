import React, { useEffect, memo } from 'react';
import * as RBS from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@/hooks/store.hook';
import { setReadyStatus } from '@/store/states/filters.slice';

// Assets
import '@/assets/styles/components/search/searchFilters.scss';

// Components
import FilterGenres from './filter/sections/FilterGenres.component';
import FilterReleaseDate from './filter/sections/FilterReleaseDate.component';
import FilterLanguage from './filter/sections/FilterLanguage.component';
import FilterVoteCount from './filter/sections/FilterVoteCount.component';
import FilterVoteAverage from './filter/sections/FilterVoteAverage.component';
import FilterRuntime from './filter/sections/FilterRuntime.component';

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
    <RBS.Accordion className='search-filters' defaultActiveKey={['0']} alwaysOpen>
      <RBS.Accordion.Item eventKey='0'>
        <RBS.AccordionHeader onClick={decoratedOnClick}>Filters</RBS.AccordionHeader>
        <RBS.AccordionBody>
          <FilterReleaseDate />
          <FilterGenres />
          <FilterLanguage />
          <FilterVoteCount />
          <FilterVoteAverage />
          <FilterRuntime />
        </RBS.AccordionBody>
      </RBS.Accordion.Item>
    </RBS.Accordion>
  );
};

export default memo(SearchFilters);
