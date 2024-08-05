import React, { memo } from 'react';
import Slider from '@mui/material/Slider';

// Hooks
import { useAppDispatch, useAppSelector } from '@/store/hooks';

// State
import { setFilterUpdate } from '@/store/slices/filters.slice';

// Interfaces
import { EFilterSection, IFilter, ISlider } from '@/interfaces/filters.interface';

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 20,
    label: '100',
  },
  {
    value: 40,
    label: '200',
  },
  {
    value: 60,
    label: '300',
  },
  {
    value: 80,
    label: '400',
  },
  {
    value: 100,
    label: '500',
  },
];

const FilterVoteAverage: React.FC = () => {
  const dispatch = useAppDispatch();
  const voteCount = useAppSelector(
    (state) => state.filters.filtersViewStructure[EFilterSection.voteAverage],
  );

  const [value, setValue] = React.useState<number>(voteCount.data.value / 5);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleChangeCommitted = (
    _: React.SyntheticEvent | Event,
    newValue: number | number[],
  ) => {
    newValue = newValue as number;

    const updatedFilter: IFilter<ISlider> = {
      ...voteCount,
      isActive: newValue === 0 ? false : true,
      data: {
        ...voteCount.data,
        value: newValue * 5,
      },
    };

    dispatch(setFilterUpdate(updatedFilter));
  };

  const valueText = () => {
    return value * 5;
  };

  return (
    <div className='discover-filter discover-filter_vote-average'>
      <h3 className='discover-filter__title'>Minimum User Votes</h3>
      <div className='discover-filter__slider'>
        <Slider
          value={value}
          valueLabelFormat={valueText}
          step={10}
          valueLabelDisplay='auto'
          marks={marks}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
        />
      </div>
    </div>
  );
};

export default memo(FilterVoteAverage);
