import type { NextPage } from 'next';
import { HomePage } from '../src/pages/HomePage';
import MetaData from './_seo';

const Home: NextPage = () => {
  return (
    <div>
      <MetaData />
      <HomePage />
    </div>
  );
};

export default Home;
