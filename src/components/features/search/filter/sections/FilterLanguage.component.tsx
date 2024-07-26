import React, { useState, memo } from 'react';
import * as RBS from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';

// Interfaces
import { EFilterSection, IFilter, ILanguageAPI } from '@/interfaces/filters.interface';

// API
import { getLanguages } from '@/api/tmbd.api';

// Hooks
import { useAppDispatch, useAppSelector } from '@/hooks/store.hook';

// State
import { setFilterUpdate } from '@/store/states/filters.slice';

const FilterLanguage: React.FC = () => {
  const dispatch = useAppDispatch();

  const stateLanguage = useAppSelector(
    (state) => state.filters.filtersViewStructure[EFilterSection.language],
  );

  const [language, setLanguage] = useState<IFilter<ILanguageAPI>>(stateLanguage);

  // TODO update fetch request to get list by popularity when realize how to do this
  const { data } = useQuery<ILanguageAPI[]>({
    queryKey: ['languages'],
    queryFn: () => getLanguages(),
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const languageId = e.target.value;

    if (!data) return;

    const selectedLanguage = data.find((language) => language.iso_639_1 === languageId);

    const updatedFilterData: IFilter<ILanguageAPI> = {
      ...stateLanguage,
      isActive: languageId !== 'xx',
      data: selectedLanguage!,
    };

    setLanguage(updatedFilterData);

    return dispatch(setFilterUpdate(updatedFilterData));
  };

  return (
    <div className='search-filter search-filter_language'>
      <h3 className='search-filter__title'>Origin language</h3>
      <RBS.Form.Select
        className='search-filter__select'
        onChange={onChangeHandler}
        value={language.data.iso_639_1}
      >
        <option value='xx'>None selected</option>
        {data &&
          data.map((language) => {
            if (language.iso_639_1 === 'xx') return null;
            return (
              <option key={language.iso_639_1} value={language.iso_639_1}>
                {language.english_name}
              </option>
            );
          })}
      </RBS.Form.Select>
    </div>
  );
};

export default memo(FilterLanguage);
