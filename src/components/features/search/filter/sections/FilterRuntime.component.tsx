import React, { memo } from 'react';

interface IFilterRuntimeProps {}

const FilterRuntime: React.FC<IFilterRuntimeProps> = () => {
  return (
    <div className='search-filter search-filter_runtime'>
      <h3 className='search-filter__title'>Runtime</h3>
    </div>
  );
};

export default memo(FilterRuntime);
