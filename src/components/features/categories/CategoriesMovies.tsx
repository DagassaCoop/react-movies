import React from 'react';
import * as RBS from 'react-bootstrap';
import categoryMovies from '@/assets/config/categoryMovies.json';
import { Link } from 'react-router-dom';

import '@/assets/styles/components/categories/categoriesList.scss';

const CategoriesMovies: React.FC = () => {
  return (
    <div className='categories-list categories-list_movies'>
      {categoryMovies.categories.map((listItem) => {
        return (
          <Link className='categories-list__item' key={listItem.id} to={'/search/' + listItem.api}>
            <div className='categories-list__item-logo'>
              <RBS.Image />
            </div>
            <div className='categories-list__item-text'>
              <h6>{listItem.title}</h6>
              <p>{listItem.description ?? null}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoriesMovies;
