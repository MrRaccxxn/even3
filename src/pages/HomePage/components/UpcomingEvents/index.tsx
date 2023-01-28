import { IEvent } from '@/types/models/IEvent';
import { useRouter } from 'next/router';
import { EventCard } from 'src/components/EventCard';

export const UpcomingEvents = ({ events }: { events: IEvent[] }) => {
  const router = useRouter()

  return (
    <section className='sm:mt-0'>

      <div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 sm:gap-5 lg:gap-14">
        {events?.map((event: any, index: number) => {
          return (
            <EventCard event={event} key={index} onClick={() => { router.push(`/event/${event.id}`) }} />
          );
        })}
      </div>
    </section>
  );
};
