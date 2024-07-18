import React, { useEffect } from 'react';
import * as RBS from 'react-bootstrap';

// Components
import SearchFilterCheck from './SearchFilterCheck';

// Hooks
import { useAppDispatch, useAppSelector } from '@/hooks/store';

// Interfaces
import { EFilterType } from '@/interfaces/filters';

// API
import { fetchReleaseDateTypes, removeFilterUpdates } from '@/store/states/filtersSlice';

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

  return (
    <div className='search-filter search-filter_release-date'>
      <RBS.Form>
        <div className='search-filter__options'>
          {/* Filter > All Releases as MinInfo */}
          <SearchFilterCheck
            filterData={releaseDateFilters.allReleases}
            setStateCallback={() => {
              if (!releaseDateFilters.allReleases.isActive)
                dispatch(
                  removeFilterUpdates(
                    releaseDateFilters.releaseDateTypes
                      .filter((type) => type.isActive)
                      .map((type) => type.id),
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
            }}
          />
          {!releaseDateFilters.allReleases.isActive && (
            <div className=''>
              {/* Filter: All Countries as MinInfo */}
              <SearchFilterCheck
                filterData={releaseDateFilters.allCountries}
                setStateCallback={() =>
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
              />
              {/* Filter: Country as ICountryAPI */}
              {!releaseDateFilters.allCountries.isActive && (
                <div className=''>countries select</div>
              )}
              {/* Filters: ReleaseDataTypes as IReleaseDataTypeAPI[] */}
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
              {/* Filter: Release From as IReleaseDate */}
              <div className=''>

              </div>
              {/* Filter: Release To as IReleaseDate */}
              <div className=''>

              </div>
            </div>
          )}
        </div>
      </RBS.Form>
    </div>
  );
};

export default SearchFilterReleaseDate;
