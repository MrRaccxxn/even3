import { Button } from "flowbite-react";
import Router from "next/router";
import { hexToBase64 } from "src/utils";


export const EventCard = (event: any) => {
  const { title, file, id } = event.event;

  return (
    <div className={`container flex flex-col gap-3 relative p-4 max-w-sm rounded-lg overflow-hidden shadow hover:shadow-md`}>
      <div style={{ backgroundImage: file ? `url(data:image/png;base64,${hexToBase64(file?.data)})` : 'none' }} className="bg-cover bg-no-repeat bg-center">
        <div className="relative block h-full">
          <div className={`h-32`}></div>
        </div>
      </div>

      <p className="mt-2 text-white text-md font-semibold line-clamp-1">
        {title || 'Title'}
      </p>

      <Button onClick={() => Router.push(`/event/${id}`)}>
        <p className="font-semibold text-base text-white">
          Go to Event
        </p>
      </Button>
    </div>
  );
};