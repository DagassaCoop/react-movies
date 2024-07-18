import React from 'react';
import * as RBS from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import '@/assets/styles/components/shared/header.scss';

const Header: React.FC = () => {
  return (
    <header className='header'>
      <RBS.Navbar fixed='top' bg='dark' data-bs-theme='dark'>
        <RBS.Container className='header__content'>
          <LinkContainer to='/'>
            <RBS.Navbar.Brand>React Movies</RBS.Navbar.Brand>
          </LinkContainer>
          <RBS.Nav className='me-auto'>
            <LinkContainer to='/movies'>
              <RBS.Nav.Link>Movies</RBS.Nav.Link>
            </LinkContainer>
            <LinkContainer to='/tv-series'>
              <RBS.Nav.Link>TV Series</RBS.Nav.Link>
            </LinkContainer>
            {/* <LinkContainer to='/media'>
              <RBS.Nav.Link>Media</RBS.Nav.Link>
            </LinkContainer> */}
          </RBS.Nav>
          <RBS.Nav>
            <LinkContainer to='/my-favorite'>
              <RBS.Nav.Link>Saved</RBS.Nav.Link>
            </LinkContainer>
          </RBS.Nav>
        </RBS.Container>
      </RBS.Navbar>
    </header>
  );
};

export default Header;
