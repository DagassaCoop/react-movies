import React, { memo } from 'react';
import { Slider } from '@mui/material';

// State
import { setFilterUpdate } from '@/store/slices/filters.slice';

// Interfaces
import { EFilterSection, IFilter, ISliderDouble } from '@/interfaces/filters.interface';

// Hooks
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 20,
    label: '60',
  },
  {
    value: 40,
    label: '120',
  },
  {
    value: 60,
    label: '180',
  },
  {
    value: 80,
    label: '240',
  },
  {
    value: 100,
    label: '300',
  },
];

const FilterRuntime: React.FC = () => {
  const dispatch = useAppDispatch();
  const runtime = useAppSelector(
    (state) => state.filters.filtersViewStructure[EFilterSection.runtime],
  );

  const [value, setValue] = React.useState<number[]>(runtime.data.value);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommitted = (
    _: React.SyntheticEvent | Event,
    newValue: number | number[],
  ) => {
    newValue = newValue as number[];

    const updatedFilter: IFilter<ISliderDouble> = {
      ...runtime,
      isActive: newValue[0] === 0 && newValue[1] === 100 ? false : true,
      data: {
        ...runtime.data,
        value: newValue.map((value) => value * 3),
      },
    };

    dispatch(setFilterUpdate(updatedFilter));
  };

  const valueText = () => {
    return `${value[0] * 3} minutes - ${value[1] * 3} minutes`;
  };

  return (
    <div className='discover-filter discover-filter_runtime'>
      <h3 className='discover-filter__title'>Runtime</h3>
      <div className='discover-filter__slider'>
        <Slider
          value={value}
          valueLabelFormat={valueText}
          step={5}
          valueLabelDisplay='auto'
          marks={marks}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
        />
      </div>
    </div>
  );
};

export default memo(FilterRuntime);
