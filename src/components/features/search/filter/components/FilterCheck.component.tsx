import React, { useEffect, memo } from 'react';
import * as RBS from 'react-bootstrap';

// Hooks
import { useAppDispatch } from '@/hooks/store.hook';

// Interfaces
import { IFilter, IMinInfo, IReleaseDateTypeAPI } from '@/interfaces/filters.interface';

// State
import { setFilterUpdate } from '@/store/states/filters.slice';

interface IFilterCheckProps {
  filterData: IFilter<IReleaseDateTypeAPI | IMinInfo>;
  setStateCallback?: () => void;
}

const FilterCheck: React.FC<IFilterCheckProps> = ({ filterData, setStateCallback }) => {
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

export default memo(FilterCheck);
