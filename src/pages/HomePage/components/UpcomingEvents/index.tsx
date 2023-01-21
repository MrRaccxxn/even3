import { EventCard } from 'src/components/EventCard';
import { Loader } from 'src/components/Loader';
import { useEvent } from 'src/hooks/models/useEvent';

export const UpcomingEvents = () => {
  const { events, isLoading } = useEvent({ filter: {} });

  if (isLoading) return <div className="flex justify-center mt-128">
    <Loader />
  </div>

  return (
    <section className='mt-128 sm:mt-0'>
      <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 lg:gap-14">
        {events?.map((event: any, index: number) => {
          return (
            <EventCard event={event} key={index} />
          );
        })}
      </div>
    </section>
  );
};
