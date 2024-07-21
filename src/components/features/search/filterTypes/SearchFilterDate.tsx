import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from "dayjs";

// Hooks
import { useAppDispatch } from "@/hooks/store";

// API
import { setFilterUpdate } from "@/store/states/filtersSlice";

// Interfaces
import { IFilter, IReleaseDate } from "@/interfaces/filters";

interface ISearchFilterDateProps {
  filteredData: IFilter<IReleaseDate>
  setStateCallback: (data: IReleaseDate, isActive: boolean) => void
}



const SearchFilterDate: React.FC<ISearchFilterDateProps> = ({ filteredData, setStateCallback }) => {
  const dispatch = useAppDispatch()

  const onChangeHandler = (next: dayjs.Dayjs) => {
    const date = next ? next.toString() : ''
    const isActive = next ? true : false
    
    setStateCallback({
      ...filteredData.data,
      date,
    }, isActive)

    const updatedFilterData = {
      ...filteredData,
      isActive,
      data: {
        ...filteredData.data,
        date,
      }
    }

    dispatch(setFilterUpdate(updatedFilterData))
  }
  
  return (
    <div className='search-filter__date'>
      <h5 className="search-filter__date-title">{filteredData.data.title}</h5>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DatePicker value={filteredData.data.date ? dayjs(filteredData.data.date) : null} onChange={(next) => onChangeHandler(next!)} className="search-filter__date-picker" />
      </LocalizationProvider>
    </div>
    
  )
}

export default SearchFilterDate;