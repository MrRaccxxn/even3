import { Button } from 'flowbite-react';
import Router from 'next/router';
import { useEffect, useState } from 'react';

export const Hero = () => {
  const [heroImageOpacity, setHeroImageOpacity] = useState<number>(100)

  const handleScroll = () => {
    const x0 = 150;
    const x1 = 700;
    const y0 = 105;
    const y1 = -5;
    if (window.scrollY >= x0 && window.scrollY <= x1 || window.scrollY >= x1) {
      const interpolation = y0 + (((window.scrollY - x0) / (x1 - x0)) * (y1 - y0))
      setHeroImageOpacity(interpolation);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  });

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
          <Button size={'xl'} className={'font-bold w-fit self-center'} onClick={() => { Router.replace('/event/register') }}>
            Create Event
          </Button>
        </div>
        <div
          className={'w-full sm:opacity-10 absolute translate-y-3/4'}>
          <img className='text-center mx-auto sm:invisible'
            style={{ width: '1000px', opacity: `${heroImageOpacity / 100}` }} alt="hero"
            src="/assets/img/illustrations/vertical_tickets.png" />
        </div>
      </div>
    </section>
  );
};
