import { useState, useEffect } from 'react';
import { useAppDispatch } from '@/hooks/store';
import { setFilterUpdate } from '@/store/states/filtersSlice';

// Interfaces
import { IFilter, IGenreAPI } from '@/interfaces/filters';

interface ISearchFilterButtonProps {
  filterData: IFilter<IGenreAPI>;
}

const SearchFilterButton: React.FC<ISearchFilterButtonProps> = ({ filterData }) => {
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState<boolean>(filterData.isActive);

  useEffect(() => {
    setIsActive(filterData.isActive);
  }, [filterData.isActive]);

  const onClickHandler = () => {
    const updatedFilterData = {
      ...filterData,
      isActive: !isActive,
    };

    setIsActive((prev) => !prev);

    return dispatch(setFilterUpdate(updatedFilterData));
  };

  return (
    <div className={`search-filter__btn ${isActive ? 'active' : ''}`} onClick={onClickHandler}>
      <span>{filterData.data.name}</span>
    </div>
  );
};

export default SearchFilterButton;
