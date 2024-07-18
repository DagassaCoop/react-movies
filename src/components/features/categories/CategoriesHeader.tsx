import React from 'react';
import * as RBS from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { v4 } from 'uuid';

interface ICategoriesHeaderProps {
  categories: Array<string>;
}

const CategoriesHeader: React.FC<ICategoriesHeaderProps> = ({ categories }) => {
  return (
    <RBS.Navbar className='categories__header'>
      <RBS.Navbar.Brand>Categories</RBS.Navbar.Brand>
      <RBS.Nav>
        {categories.map((categoryName: string) => {
          return (
            <LinkContainer key={v4()} to={'../' + categoryName}>
              <RBS.NavLink>{categoryName}</RBS.NavLink>
            </LinkContainer>
          );
        })}
      </RBS.Nav>
    </RBS.Navbar>
  );
};

export default CategoriesHeader;
