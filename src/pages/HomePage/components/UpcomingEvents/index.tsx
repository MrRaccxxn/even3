import { useEffect, useState } from 'react';
import { EventCard } from '../../../../components/EventCard';

export const UpcomingEvents = () => {
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    setEvents(['1', '2', '3', '4', '5', '6', '7', '8']);
  }, []);

  return (
    <section className='my-20'>
      <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-14">
        {events?.map((event, index) => {
          return (
            <EventCard key={index} />
          );
        })}
      </div>
    </section>
  );
};
