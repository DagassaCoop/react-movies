import React, { useEffect } from 'react';
import * as RBS from 'react-bootstrap';
import { v4 } from 'uuid';

// Components
import SearchFilterCheck from '../filterTypes/SearchFilterCheck';
import SearchFilterCountry from '../filterTypes/SearchFilterCountry';

// Hooks
import { useAppDispatch, useAppSelector } from '@/hooks/store';

// Interfaces
import { EFilterSection, EFilterType, EReleaseDateAPIType, ICountryAPI, IFilter, IReleaseDate } from '@/interfaces/filters';

// API
import { fetchReleaseDateTypes, removeFilterUpdates } from '@/store/states/filtersSlice';
import SearchFilterDate from '../filterTypes/SearchFilterDate';


const SearchFilterReleaseDate: React.FC = () => {
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

  const allReleasesOnChangeHandler = () => {
    if (!releaseDateFilters.allReleases.isActive)
      dispatch(
        removeFilterUpdates(
          [...releaseDateFilters.releaseDateTypes
            .filter((type) => type.isActive)
            .map((type) => type.id), releaseDateFilters.allCountries.id, releaseDateFilters.country ? releaseDateFilters.country.id : ''],
        ),
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
  }

  const allCountriesOnChangeHandler = () => {
    if (!releaseDateFilters.allCountries.isActive) {
      dispatch(removeFilterUpdates([releaseDateFilters.country.id]))
    }
    setReleaseDateFilters((prev) => {
      return {
        ...prev,
        allCountries: {
          ...prev.allCountries,
          isActive: !prev.allCountries.isActive,
        },
      };
    })
  }

  const countryOnChangeHandler = (data: ICountryAPI, isActive: boolean) => {
    setReleaseDateFilters((prev) => {
      return {
        ...prev,
        country: {
          ...prev.country,
          isActive,
          data,
        }
      }
    });
  }

  const releaseDateOnChangeHandler = (releaseDateAPIType: EReleaseDateAPIType) => (data: IReleaseDate, isActive: boolean) => {
    const releaseDateName = releaseDateAPIType === EReleaseDateAPIType.gte ? 'releaseFrom' : 'releaseTo';
    
    setReleaseDateFilters(prev => {
      return {
        ...prev,
        [releaseDateName]: {
          ...prev[releaseDateName],
          isActive,
          data,
        }
      }
    })
  }



  return (
    <div className='search-filter search-filter_release-date'>
      <RBS.Form>
      <h3 className='search-filter__title'>Release Dates</h3>
        <div className='search-filter__options'>
          {/* Filter > All Releases as MinInfo */}
          <SearchFilterCheck
            filterData={releaseDateFilters.allReleases}
            setStateCallback={allReleasesOnChangeHandler}
          />
          {!releaseDateFilters.allReleases.isActive && (
            <>
              {/* Filter: All Countries as MinInfo */}
              <SearchFilterCheck
                filterData={releaseDateFilters.allCountries}
                setStateCallback={allCountriesOnChangeHandler}
              />
              {/* Filter: Country as ICountryAPI */}
              {!releaseDateFilters.allCountries.isActive && (
                <div className='search-filter_release-date__country'>
                  <SearchFilterCountry filterData={releaseDateFilters.country} setStateCallback={countryOnChangeHandler}/>
                </div>
              )}
              {/* Filters: ReleaseDataTypes as IReleaseDataTypeAPI[] */}
              <div className='search-filter_release-date__types'>
                {releaseDateFilters.releaseDateTypes.map((typeData) => {
                  return (
                    <SearchFilterCheck
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
          <SearchFilterDate filteredData={releaseDateFilters.releaseFrom} setStateCallback={releaseDateOnChangeHandler(EReleaseDateAPIType.gte)}/>
        </div>
        {/* Filter: Release To as IReleaseDate */}
        <div className='search-filter_release-date__date'>
          <SearchFilterDate filteredData={releaseDateFilters.releaseTo} setStateCallback={() => {}}/>
        </div>
      </RBS.Form>
    </div>
  );
};

export default SearchFilterReleaseDate;
