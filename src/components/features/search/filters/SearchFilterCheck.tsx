import React, { useEffect } from 'react';
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
    <RBS.Form.Check>
      <RBS.Form.Check.Input
        type='checkbox'
        defaultChecked={filterData.isActive}
        onChange={onChangeHandler}
      />
      <RBS.Form.Check.Label>{filterData.data.title}</RBS.Form.Check.Label>
    </RBS.Form.Check>
  );
};

export default SearchFilterCheck;
