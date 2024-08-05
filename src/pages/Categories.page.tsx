import React from 'react';
import { useLoaderData } from 'react-router-dom';

// Hooks
import { useAppSelector } from '@/store/hooks';

// Interfaces
import {
  ECategoryDefaultType,
  ECategoryMovieType,
  ECategoryTVSerieType,
  ICategoriesLoaderDataOutput,
  ICategoriesLoaderOutput,
} from '@/interfaces/categories.interface';

// Components
import CategoriesHeader from '@/components/features/categories/CategoriesHeader';
import CategoriesMovies from '@/components/features/categories/CategoriesMovies';

const Categories: React.FC = () => {
  const redirectFrom = useAppSelector((state) => state.categories.redirectFrom);

  let loaderData = useLoaderData() as ICategoriesLoaderOutput;

  if (typeof loaderData?.type === 'string') {
    loaderData = loaderData as ICategoriesLoaderDataOutput;
  } else {
    return null;
  }

  const categories = [
    redirectFrom ?? 'N/A',
    ...Object.keys(ECategoryDefaultType).filter((key) => {
      if (isNaN(Number(key))) return key;
    }),
  ];

  return (
    <div className='categories'>
      <CategoriesHeader categories={categories} />
      <div className='categories__content'>
        {/* <h5>List</h5> */}
        {
          // Movies
          loaderData.type === ECategoryMovieType[ECategoryMovieType.Movies] ? (
            <CategoriesMovies />
          ) : null
        }
        {
          // TV Series
          loaderData.type === ECategoryTVSerieType[ECategoryTVSerieType['TV Series']] ? (
            <>TV Series list is coming</>
          ) : null
        }
        {
          // Genres
          loaderData.type === ECategoryDefaultType[ECategoryDefaultType.Genres] ? (
            <>Genres list is coming</>
          ) : null
        }
        {loaderData.type === ECategoryDefaultType[ECategoryDefaultType.Peoples] ? (
          <>Peoples list is coming</>
        ) : null}
        {
          // Countries
          loaderData.type === ECategoryDefaultType[ECategoryDefaultType.Countries] ? (
            <>Countries list is coming</>
          ) : null
        }
      </div>
    </div>
  );
};

export default Categories;
