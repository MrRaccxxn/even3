import { useEffect, useState } from 'react';
import { EventCard } from '../../../../components/EventCard';

export const UpcomingEvents = () => {
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    setEvents(['1', '2', '3', '4', '5', '6', '7', '8']);
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {events?.map((event, index) => {
            return (
              <div key={index} className="xl:w-1/4 md:w-1/2 p-4">
                <EventCard />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
