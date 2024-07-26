import React, { useEffect, memo, useCallback } from 'react';
import * as RBS from 'react-bootstrap';

// Components
import FilterCheck from '../components/FilterCheck.component';
import FilterCountry from '../components/FilterCountry.component';
import SearchFilterDate from '../components/FilterDate.component';

// Hooks
import { useAppDispatch, useAppSelector } from '@/hooks/store.hook';

// Interfaces
import {
  EFilterType,
  EReleaseDateAPIType,
  ICountryAPI,
  IReleaseDate,
} from '@/interfaces/filters.interface';

// API
import { fetchReleaseDateTypes, removeFilterUpdates } from '@/store/states/filters.slice';

const FilterReleaseDate: React.FC = () => {
  const dispatch = useAppDispatch();

  const filterReleaseDates = useAppSelector(
    (state) => state.filters.filtersViewStructure[EFilterType.releaseDate],
  );

  const [releaseDateFilters, setReleaseDateFilters] = React.useState(filterReleaseDates);

  useEffect(() => {
    dispatch(fetchReleaseDateTypes());
  }, []);

  useEffect(() => {
    setReleaseDateFilters(filterReleaseDates);
  }, [filterReleaseDates]);

  const allReleasesOnChangeHandler = useCallback(() => {
    if (!releaseDateFilters.allReleases.isActive)
      dispatch(
        removeFilterUpdates([
          ...releaseDateFilters.releaseDateTypes
            .filter((type) => type.isActive)
            .map((type) => type.id),
          releaseDateFilters.allCountries.id,
          releaseDateFilters.country ? releaseDateFilters.country.id : '',
        ]),
      );
    setReleaseDateFilters((prev) => {
      return {
        ...prev,
        allReleases: {
          ...prev.allReleases,
          isActive: !prev.allReleases.isActive,
        },
      };
    });
  }, []);

  const allCountriesOnChangeHandler = useCallback(() => {
    if (!releaseDateFilters.allCountries.isActive) {
      dispatch(removeFilterUpdates([releaseDateFilters.country.id]));
    }
    setReleaseDateFilters((prev) => {
      return {
        ...prev,
        allCountries: {
          ...prev.allCountries,
          isActive: !prev.allCountries.isActive,
        },
      };
    });
  }, []);

  const countryOnChangeHandler = useCallback((data: ICountryAPI, isActive: boolean) => {
    setReleaseDateFilters((prev) => {
      return {
        ...prev,
        country: {
          ...prev.country,
          isActive,
          data,
        },
      };
    });
  }, []);

  const releaseDateOnChangeHandler = useCallback(
    (releaseDateAPIType: EReleaseDateAPIType) => (data: IReleaseDate, isActive: boolean) => {
      const releaseDateName =
        releaseDateAPIType === EReleaseDateAPIType.gte ? 'releaseFrom' : 'releaseTo';

      setReleaseDateFilters((prev) => {
        return {
          ...prev,
          [releaseDateName]: {
            ...prev[releaseDateName],
            isActive,
            data,
          },
        };
      });
    },
    [],
  );

  return (
    <div className='search-filter search-filter_release-date'>
      <RBS.Form>
        <h3 className='search-filter__title'>Release Dates</h3>
        <div className='search-filter__options'>
          {/* Filter > All Releases as MinInfo */}
          <FilterCheck
            filterData={releaseDateFilters.allReleases}
            setStateCallback={allReleasesOnChangeHandler}
          />
          {!releaseDateFilters.allReleases.isActive && (
            <>
              {/* Filter: All Countries as MinInfo */}
              <FilterCheck
                filterData={releaseDateFilters.allCountries}
                setStateCallback={allCountriesOnChangeHandler}
              />
              {/* Filter: Country as ICountryAPI */}
              {!releaseDateFilters.allCountries.isActive && (
                <div className='search-filter_release-date__country'>
                  <FilterCountry
                    filterData={releaseDateFilters.country}
                    setStateCallback={countryOnChangeHandler}
                  />
                </div>
              )}
              {/* Filters: ReleaseDataTypes as IReleaseDataTypeAPI[] */}
              <div className='search-filter_release-date__types'>
                {releaseDateFilters.releaseDateTypes.map((typeData) => {
                  return (
                    <FilterCheck
                      key={typeData.id}
                      filterData={typeData}
                      setStateCallback={() =>
                        setReleaseDateFilters((prev) => {
                          const typeIndex = prev.releaseDateTypes.findIndex(
                            (type) => type.id === typeData.id,
                          );
                          const updatedReleaseDataTypes = [...prev.releaseDateTypes];
                          updatedReleaseDataTypes[typeIndex] = {
                            ...updatedReleaseDataTypes[typeIndex],
                            isActive: !updatedReleaseDataTypes[typeIndex].isActive,
                          };

                          return {
                            ...prev,
                            releaseDateTypes: updatedReleaseDataTypes,
                          };
                        })
                      }
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
        {/* Filter: Release From as IReleaseDate */}
        <div className='search-filter_release-date__date'>
          <SearchFilterDate
            filteredData={releaseDateFilters.releaseFrom}
            setStateCallback={releaseDateOnChangeHandler(EReleaseDateAPIType.gte)}
          />
        </div>
        {/* Filter: Release To as IReleaseDate */}
        <div className='search-filter_release-date__date'>
          <SearchFilterDate
            filteredData={releaseDateFilters.releaseTo}
            setStateCallback={() => {}}
          />
        </div>
      </RBS.Form>
    </div>
  );
};

export default memo(FilterReleaseDate);
