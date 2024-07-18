import React from 'react';
import * as RBS from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import '@/assets/styles/pages/root.scss';

import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

const RootLayout: React.FC = () => {
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

export default RootLayout;
