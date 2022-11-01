import Layout from '../../components/Layout/Layout';
import { Hero } from './components/Hero';
import { UpcomingEvents } from './components/UpcomingEvents';

export const HomePage = () => {
  return (
    <Layout>
      <div className='bg-transparent'>
        <div className="relative">
          <Hero />
        </div>
        <div>
          <UpcomingEvents />
        </div>
      </div>
    </Layout>
  );
};
