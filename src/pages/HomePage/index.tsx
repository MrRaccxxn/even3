import { ContainerX } from 'src/components/Layout/Container';
import { Footer } from 'src/components/Layout/Footer';
import { Header } from 'src/components/Layout/Header';
import { FrequentAskedQuestions } from './components/FAQ/FrequentAskedQuestions';
import { Hero } from './components/Hero';
import { UpcomingEvents } from './components/UpcomingEvents';

export const HomePage = () => {
  return (
    <>
      <div className='bg-transparent'>
        <div className="relative h-screen">
          <Header />
          <Hero />
        </div>
      </div>
      <ContainerX>
        <div className='flex flex-col gap-16'>
          <UpcomingEvents />
          <FrequentAskedQuestions />
          <Footer />
        </div>
      </ContainerX>
    </>

  );
};
