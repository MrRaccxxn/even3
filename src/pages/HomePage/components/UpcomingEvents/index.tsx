import { useRouter } from 'next/router';
import { EventCard } from 'src/components/EventCard';
import { Loader } from 'src/components/Loader';
import { useEvent } from 'src/hooks/models/useEvent';

export const UpcomingEvents = () => {
  const { events, isLoading } = useEvent({ filter: {} });
  const router = useRouter()

  if (isLoading) return <div className="flex justify-center mt-128">
    <Loader />
  </div>

  return (
    <section className='mt-48 sm:mt-0'>
      <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-3xl">Most recent events 🎉!</h2>

      <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 sm:gap-5 lg:gap-14">
        {events?.map((event: any, index: number) => {
          return (
            <EventCard event={event} key={index} onClick={() => { router.push(`/event/${event.id}`) }} />
          );
        }).reverse()}
      </div>
    </section>
  );
};
