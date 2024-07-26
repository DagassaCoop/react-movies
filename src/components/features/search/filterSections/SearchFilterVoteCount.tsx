import React from "react";
import Slider from '@mui/material/Slider';

// Hooks
import { useAppDispatch, useAppSelector } from '@/hooks/store';

// State
import { setFilterUpdate } from "@/store/states/filtersSlice";

// Interfaces
import { EFilterSection, IFilter, ISliderDouble } from "@/interfaces/filters";

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 50,
    label: '5'
  },
  {
    value: 100,
    label: '10',
  },
];

const SearchFilterVoteCount: React.FC = () => {
  const dispatch = useAppDispatch();
  const voteCount = useAppSelector(state => state.filters.filtersViewStructure[EFilterSection.voteCount])

  const [value, setValue] = React.useState<number[]>(voteCount.data.value);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  }

  const handleChangeCommitted = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    newValue = newValue as number[];
    
    const updatedFilter: IFilter<ISliderDouble> = {
      ...voteCount,
      isActive: newValue[0] === 0 && newValue[1] === 100 ? false : true,
      data: {
        ...voteCount.data,
        value: newValue
      }
    }

    dispatch(setFilterUpdate(updatedFilter));
  };

  const valueText = () => {
    return `Rated ${value[0] / 10} - ${value[1] / 10}`;
  }

  return (
    <div className="search-filter search-filter_vote-count">
      <h3 className="search-filter__title">User Score</h3>
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

export default SearchFilterVoteCount