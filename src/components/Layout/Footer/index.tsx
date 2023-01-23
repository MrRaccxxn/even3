export const Footer = () => {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container py-8 md:py-4 mx-auto flex flex-row items-center sm:flex-col sm:text-center sm:justify-center">
        <a className="flex title-font font-medium justify-start sm:justify-center text-gray-900">
          <span className="text-xl self-center text-headline">Event3</span>
        </a>
        <p className="text-sm text-gray-500 ml-4 pl-4 border-l-2 border-gray-200 py-2 sm:m-0 sm:border-none">
          © 2023 Event3 —
          <a
            href="https://twitter.com/MrRaccxxn"
            className="text-gray-600 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @MrRaccxxn
          </a>
        </p>
        <span className="inline-flex ml-auto sm:mt-4 sm:ml-0">
          <a className="ml-3 text-gray-500" href="https://twitter.com/_even3" target='_blank'>
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
            </svg>
          </a>
        </span>
      </div>
    </footer>
  );
};
