import { Button } from "../Button";

export const EventCard = () => {
  return (
    <div className="container flex flex-col gap-3 relative p-4 max-w-sm rounded-lg overflow-hidden shadow hover:shadow-md bg-buttonBackgroundSecondary">
      <div>
        <div className="absolute top-0 right-0 mt-2 mr-2 p-4 flex justify-between">
          <div className="inline-flex items-center justify-center w-8 h-8 p-2 rounded-full bg-white shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-auto fill-current text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="relative block h-full">
          <div className="h-32 bg-gray-100 rounded-lg"></div>
        </div>
      </div>

      <p className="mt-2 text-white text-md font-semibold line-clamp-1">
        Event Title
      </p>

      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-3">
          <div className="flex items-center justify-center w-10 h-10 overflow-hidden rounded-lg">
            <img src="https://images.unsplash.com/photo-1548544149-4835e62ee5b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-white text-sm">@Someuserx</p>
            <p className="text-sm">role</p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-white text-sm">1.75 ETH</p>
          <p className="text-sm">Current Bit</p>
        </div>
      </div>


      <Button>
        Buy Ticket
      </Button>
    </div>
  );
};
