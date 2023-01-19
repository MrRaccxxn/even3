import Link from 'next/link';
import { Even3Logo } from '../../../../public/assets/img/Even3Logo';
import { ContainerX } from '../Container';
import { ConnectButton } from './ConnectButton';

export const Header = () => {
  return (
    <div className="absolute z-50 bg-transparent" style={{ minInlineSize: '-webkit-fill-available' }}>
      <header>
        <ContainerX>
          <div className="container mx-auto flex flex-wrap py-5 flex-row items-center md:items-center justify-between">
            <Link href={'/'}>
              <a className="flex title-font font-medium items-center">
                <Even3Logo />
              </a>
            </Link>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center sm:hidden">
            </nav>
            <ConnectButton />
          </div>
        </ContainerX>
      </header>
    </div>
  );
};
