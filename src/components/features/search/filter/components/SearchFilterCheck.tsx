import React, { useEffect, memo } from 'react';
import * as RBS from 'react-bootstrap';

// Hooks
import { useAppDispatch } from '@/hooks/store';

// Interfaces
import { IFilter, IMinInfo, IReleaseDateTypeAPI } from '@/interfaces/filters';

// State
import { setFilterUpdate } from '@/store/states/filtersSlice';

interface ISearchFilterCheckProps {
  filterData: IFilter<IReleaseDateTypeAPI | IMinInfo>;
  setStateCallback?: () => void;
}

const SearchFilterCheck: React.FC<ISearchFilterCheckProps> = ({ filterData, setStateCallback }) => {
  const dispatch = useAppDispatch();

  const onChangeHandler = () => {
    const updatedFilterData = {
      ...filterData,
      isActive: !filterData.isActive,
    };

    setStateCallback && setStateCallback();

    return dispatch(setFilterUpdate(updatedFilterData));
  };

  useEffect(() => {
    if (filterData.isActive) dispatch(setFilterUpdate(filterData));
  }, []);

  return (
    <RBS.Form.Check className='search-filter__check'>
      <RBS.Form.Check.Input
        type='checkbox'
        defaultChecked={filterData.isActive}
        onChange={onChangeHandler}
        className='search-filter__check-input'
      />
      <RBS.Form.Check.Label className='search-filter__check-label'>
        {filterData.data.title}
      </RBS.Form.Check.Label>
    </RBS.Form.Check>
  );
};

export default memo(SearchFilterCheck);
