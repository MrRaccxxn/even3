import Link from 'next/link';
import { Even3Logo } from '../../../../public/assets/img/Even3Logo';
import { ContainerX } from '../Container';
import { ConnectButton } from './ConnectButton';

export const Header = ({ showNavigation = false }: { showNavigation?: boolean }) => {
  return (
    <div className="absolute bg-transparent" style={{ minInlineSize: '-webkit-fill-available' }}>
      <header>
        <ContainerX>
          <div className="container mx-auto flex flex-wrap py-5 sm:py-2 flex-row items-center md:items-center justify-between">
            <Link href={'/'}>
              <a className="flex">
                <Even3Logo />
              </a>
            </Link>
            {showNavigation && <nav className="md:ml-auto md:mr-auto flex gap-8 flex-wrap items-center text-base justify-center sm:hidden">
              <Link href={'/poap-searcher'}>
                <a className="flex title-font font-bold items-center text-md hover:text-gray-300">
                  POAP SEARCHER
                </a>
              </Link>
              <Link href={'/event/gallery'}>
                <a className="flex title-font font-bold items-center text-md hover:text-gray-300">
                  ALL EVENTS
                </a>
              </Link>
              <Link href={"mailto: even3.contact@gmail.com"}>
                <a className="flex title-font font-bold  items-center text-md hover:text-gray-300">
                  CONTACT
                </a>
              </Link>
            </nav>
            }
            <ConnectButton />
          </div>
        </ContainerX>
      </header>
    </div>
  );
};
