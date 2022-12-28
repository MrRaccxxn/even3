import { useEffect, useState } from 'react';
import { EventCard } from '../../../../components/EventCard';
import { getEvents } from '../../../../services/lib/event';

export const UpcomingEvents = () => {
  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await getEvents()
      setEvents(response.data);
    }

    fetchEvents()
  }, [])

  return (
    <section className='my-20'>
      <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-14">
        {events?.map((event: any, index: number) => {
          return (
            <EventCard event={event} key={index} />
          );
        })}
      </div>
    </section>
  );
};
