import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../../../components/Button';

export const Hero = () => {
  return (
    <section className="text-gray-600 body-font ">
      <div className="container mx-auto flex py-28 flex-row md:flex-col items-center sm:p-0">
        <div className="lg:flex-grow w-2/3 flex flex-col md:items-start md:mb-0 sm:m-0 sm:p-0 sm:items-center sm:text-center sm:w-full">
          <h1 className="title-font mb-4 text-headline">
            Secure ticketing {' '}
            <br className="sm:hidden lg:inline-block" />
            for your events.
          </h1>
          <p className="mb-8 leading-relaxed">
            Experience the security benefits of web3 without any additional configuration on your web 2 application.
          </p>
          <div className="flex justify-start gap-4">
            <Link href={'/event/register'}>
              <Button>
                Create Event
              </Button>
            </Link>
            <Button variant='text'>
              View Events
            </Button>
          </div>
        </div>
        <div className="lg:max-w-2xl lg:w-full md:w-1/3 w-5/6 flex items-center justify-end sm:hidden">
          <Image
            width={'308px'}
            height={'290px'}
            className="object-cover object-center rounded"
            alt="hero"
            src="/assets/img/illustrations/tickets.png"
          />
        </div>
      </div>
    </section>
  );
};
