import { Loader } from 'src/components/Loader';
import { useEvent } from 'src/hooks/models/useEvent';
import { EventCard } from '../../../../components/EventCard';

export const UpcomingEvents = () => {
  const { events, isLoading } = useEvent({ filter: {} });

  if (isLoading) return <div className="flex justify-center mt-12">
    <Loader />
  </div>

  console.log(events)

  return (
    <section className='my-20'>
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
