
import Link from 'next/link';
import { useState } from 'react';
import { Container } from '../Container';
import { ConnectButton } from './ConnectButton';
import { navLinks } from './navLinks';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  return (
    <div>
      <header>
        <Container>
          <div className="container mx-auto flex flex-wrap p-5 flex-row items-center md:items-center justify-between">
            <Link href={'/'}>
              <a className="flex title-font font-medium items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span className="ml-3 text-xl sm:ml-1">Event3</span>
              </a>
            </Link>
            <button onClick={() => setMobileMenuOpen(prev => !prev)}>
              {
                mobileMenuOpen ?
                  (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="12" height="12" overflow="visible" stroke="white" strokeWidth="10" stroke-linecap="round">
                      <line x1="0" y1="0" x2="50" y2="50" />
                      <line x1="50" y1="0" x2="0" y2="50" />
                    </svg>
                  )
                  :
                  (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="white">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  )
              }
            </button>
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center sm:hidden">
              {
                navLinks.map((navLink, index) =>
                  <a href={navLink.href} className="mr-5 hover:text-gray-900" key={index}>
                    {navLink.title}
                  </a>
                )
              }
            </nav>
            <ConnectButton />
          </div>
        </Container>
      </header>
      {
        mobileMenuOpen ?
          (
            <div className='container flex flex-col gap-7 h-screen z-10 bg-background px-10 fixed'>
              {
                navLinks.map((navLink, index) =>
                  <a href={navLink.href} key={index}>
                    {navLink.title}
                  </a>
                )
              }
              <ConnectButton />
            </div>
          )
          : null
      }
    </div>
  );
};
