import { Button } from 'flowbite-react';

export const Hero = () => {
  return (
    <section className="text-gray-600 body-font bg-gradient-to-bl relative h-full">
      <div className="container mx-auto flex flex-col gap-16 text-center h-full justify-center">
        <div className="flex flex-col items-center md:items-start px-8">
          <h1 className="title-font mb-4 text-headline text-7xl sm:text-3xl">
            Unleash the ultimate platform  {' '}
            <br className="sm:hidden lg:inline-block sm:text-base" />
            for your events_
          </h1>
          <p className="mb-8 leading-relaxed text-xl sm:text-base">
            Host your community events and make them unforgettable
          </p>
          <Button size={'xl'} className={'font-bold w-fit self-center'}>
            Create Event
          </Button>
        </div>
        <div className='absolute w-full translate-y-3/4 sm:opacity-10'>
          <img className='text-center mx-auto sm:invisible' alt="hero" style={{ width: '1000px' }}
            src="/assets/img/illustrations/vertical_tickets.png" />
        </div>
      </div>
    </section>
  );
};
