import React from "react";
import Slider from '@mui/material/Slider';

// Hooks
import { useAppDispatch, useAppSelector } from '@/hooks/store';

// State
import { setFilterUpdate } from "@/store/states/filtersSlice";

// Interfaces
import { EFilterSection, IFilter, ISlider } from "@/interfaces/filters";

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 20,
    label: '100'
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

const SearchFilterVoteAverage: React.FC = () => {
  const dispatch = useAppDispatch();
  const voteCount = useAppSelector(state => state.filters.filtersViewStructure[EFilterSection.voteAverage])

  const [value, setValue] = React.useState<number>(voteCount.data.value / 5);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  }

  const handleChangeCommitted = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    newValue = newValue as number;
    
    const updatedFilter: IFilter<ISlider> = {
      ...voteCount,
      isActive: newValue === 0 ? false : true,
      data: {
        ...voteCount.data,
        value: newValue * 5
      }
    }

    dispatch(setFilterUpdate(updatedFilter));
  };

  const valueText = () => {
    return value * 5;
  }

  return (
    <div className="search-filter search-filter_vote-count">
      <h3 className="search-filter__title">Minimum User Votes</h3>
      <div className="search-filter__slider">
        <Slider
          value={value}
          valueLabelFormat={valueText}
          step={10}
          valueLabelDisplay="auto"
          marks={marks}
          onChange={handleChange}
          onChangeCommitted={handleChangeCommitted}
        />
      </div>
    </div>
  )
}

export default SearchFilterVoteAverage