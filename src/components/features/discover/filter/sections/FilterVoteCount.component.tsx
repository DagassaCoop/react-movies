import React, { memo } from 'react';
import Slider from '@mui/material/Slider';

// Hooks
import { useAppDispatch, useAppSelector } from '@/store/hooks';

// State
import { setFilterUpdate } from '@/store/slices/filters.slice';

// Interfaces
import { EFilterSection, IFilter, ISliderDouble } from '@/interfaces/filters.interface';

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 50,
    label: '5',
  },
  {
    value: 100,
    label: '10',
  },
];

const FilterVoteCount: React.FC = () => {
  const dispatch = useAppDispatch();
  const voteCount = useAppSelector(
    (state) => state.filters.filtersViewStructure[EFilterSection.voteCount],
  );

  const [value, setValue] = React.useState<number[]>(voteCount.data.value);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommitted = (
    _: React.SyntheticEvent | Event,
    newValue: number | number[],
  ) => {
    newValue = newValue as number[];

    const updatedFilter: IFilter<ISliderDouble> = {
      ...voteCount,
      isActive: newValue[0] === 0 && newValue[1] === 100 ? false : true,
      data: {
        ...voteCount.data,
        value: newValue,
      },
    };

    dispatch(setFilterUpdate(updatedFilter));
  };

  const valueText = () => {
    return `Rated ${value[0] / 10} - ${value[1] / 10}`;
  };

  return (
    <div className='discover-filter discover-filter_vote-count'>
      <h3 className='discover-filter__title'>User Score</h3>
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

export default memo(FilterVoteCount);
