import React from 'react';
import { useLoaderData } from 'react-router-dom';

// Components
import Search from './components/Search.component';

// Interfaces
import { IHomeLoaderOutput } from '@/router/loaders/home.loader';

const Home: React.FC = () => {
  const loadedData = useLoaderData() as IHomeLoaderOutput

  return (
    <div className='home'>
      <Search bgImageLink={loadedData.imageLink}/>
    </div>
  );
};

export default Home;
