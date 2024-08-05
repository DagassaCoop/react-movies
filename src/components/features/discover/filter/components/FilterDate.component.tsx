import React, { memo } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// Hooks
import { useAppDispatch } from '@/store/hooks';

// API
import { setFilterUpdate } from '@/store/slices/filters.slice';

// Interfaces
import { IFilter, IReleaseDate } from '@/interfaces/filters.interface';

interface IFilterDateProps {
  filteredData: IFilter<IReleaseDate>;
  setStateCallback: (data: IReleaseDate, isActive: boolean) => void;
}

const FilterDate: React.FC<IFilterDateProps> = ({ filteredData, setStateCallback }) => {
  const dispatch = useAppDispatch();

  const onChangeHandler = (next: dayjs.Dayjs) => {
    const date = next ? next.toString() : '';
    const isActive = next ? true : false;

    setStateCallback(
      {
        ...filteredData.data,
        date,
      },
      isActive,
    );

    const updatedFilterData = {
      ...filteredData,
      isActive,
      data: {
        ...filteredData.data,
        date,
      },
    };

    dispatch(setFilterUpdate(updatedFilterData));
  };

  return (
    <div className='discover-filter__date'>
      <h5 className='discover-filter__date-title'>{filteredData.data.title}</h5>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={filteredData.data.date ? dayjs(filteredData.data.date) : null}
          onChange={(next) => onChangeHandler(next!)}
          className='discover-filter__date-picker'
        />
      </LocalizationProvider>
    </div>
  );
};

export default memo(FilterDate);
