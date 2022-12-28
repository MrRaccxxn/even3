
import Link from 'next/link';
import { Container } from '../Container';
import { ConnectButton } from './ConnectButton';

export const Header = () => {
  return (
    <div>
      <header>
        <Container>
          <div className="container mx-auto flex flex-wrap p-5 flex-row items-center md:items-center justify-between">
            <Link href={'/'}>
              <a className="flex title-font font-medium items-center">
                <span className="ml-3 text-xl sm:ml-1">Event3</span>
              </a>
            </Link>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center sm:hidden">
              {/* {
                navLinks.map((navLink, index) =>
                  <a href={navLink.href} className="mr-5 hover:text-gray-900" key={index}>
                    {navLink.title}
                  </a>
                )
              } */}
            </nav>
            <ConnectButton />
          </div>
        </Container>
      </header>
    </div>
  );
};
