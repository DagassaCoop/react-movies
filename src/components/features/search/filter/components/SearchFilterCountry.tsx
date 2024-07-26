import React, { memo } from 'react';
import * as RBS from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';

// Interfaces
import { ICountryAPI, IFilter } from '@/interfaces/filters';

// API
import { getCountries } from '@/api/tmbd';

// Hooks
import { useAppDispatch } from '@/hooks/store';

// State
import { setFilterUpdate } from '@/store/states/filtersSlice';

interface ISearchFilterCountryProps {
  filterData: IFilter<ICountryAPI>;
  setStateCallback: (data: ICountryAPI, isActive: boolean) => void;
}

const SearchFilterCountry: React.FC<ISearchFilterCountryProps> = ({
  filterData,
  setStateCallback,
}) => {
  const dispatch = useAppDispatch();

  const { data } = useQuery<ICountryAPI[]>({
    queryKey: ['countries'],
    queryFn: () => getCountries(),
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryId = e.target.value;
    let updatedFilterData = filterData;

    if (countryId === 'Select country') {
      const zeroData: ICountryAPI = {
        english_name: '',
        iso_3166_1: '',
        native_name: '',
      };

      setStateCallback(zeroData, false);

      updatedFilterData = {
        ...filterData,
        isActive: false,
        data: zeroData,
      };
    } else {
      const country = data?.find((country) => country.iso_3166_1 === countryId);
      if (country) {
        setStateCallback(country, true);

        updatedFilterData = {
          ...filterData,
          isActive: true,
          data: country,
        };
      }
    }
    return dispatch(setFilterUpdate(updatedFilterData));
  };

  return (
    <RBS.Form.Select
      className='search-filter__select search-filter__country'
      defaultValue={filterData.isActive ? filterData.data.iso_3166_1 : undefined}
      onChange={onChangeHandler}
    >
      <option>Select country</option>
      {data &&
        data.map((country) => {
          return (
            <option key={country.iso_3166_1} value={country.iso_3166_1}>
              {country.english_name}
            </option>
          );
        })}
    </RBS.Form.Select>
  );
};

export default memo(SearchFilterCountry);
