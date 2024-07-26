import { useState, useEffect, memo } from 'react';

// Hooks
import { useAppDispatch } from '@/hooks/store.hook';

// State
import { setFilterUpdate } from '@/store/states/filters.slice';

// Interfaces
import { IFilter, IGenreAPI } from '@/interfaces/filters.interface';

interface IFilterButtonProps {
  filterData: IFilter<IGenreAPI>;
}

const FilterButton: React.FC<IFilterButtonProps> = ({ filterData }) => {
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

export default memo(FilterButton);
