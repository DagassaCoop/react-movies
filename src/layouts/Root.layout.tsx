import React from 'react';
import * as RBS from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

// Assets
import '@/assets/styles/pages/root.scss';

// Components
import Header from '@/components/shared/Header.component';
import Footer from '@/components/shared/Footer.component';

const Root: React.FC = () => {
  return (
    <div className='root-layout'>
      <Header />
      <main className='root-layout__content'>
        <RBS.Container>
          <Outlet />
        </RBS.Container>
      </main>
      <Footer />
    </div>
  );
};

export default Root;
