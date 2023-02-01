import { Spinner } from 'flowbite-react';
import { ContainerX } from 'src/components/Layout/Container';
import { Footer } from 'src/components/Layout/Footer';
import { useEvent } from 'src/hooks/models/useEvent';
import { FrequentAskedQuestions } from './components/FAQ/FrequentAskedQuestions';
import { Hero } from './components/Hero';
import { UpcomingEvents } from './components/UpcomingEvents';

export const HomePage = () => {
  const { events, isLoading } = useEvent({ limit: 6 });

  return (
    <>
      <div className="relative h-screen bottom-0">
        {/* <Header showNavigation={true} /> */}
        <Hero />
      </div>
      <ContainerX>
        <div className='flex flex-col gap-16'>
          <h2 className="mt-48 mb-12 text-4xl font-bold leading-none text-center sm:text-3xl">Most recent events 🎉!</h2>
          {
            isLoading ? <div className='w-full text-center'><Spinner /></div> : <UpcomingEvents events={events || []} />
          }
          <FrequentAskedQuestions />
          <Footer />
        </div>
      </ContainerX>
    </>
  );
};
