import { IEvent } from "@/types/models/IEvent";
import Image from "next/image";
import { AiOutlineVideoCamera } from 'react-icons/ai';
import { dateToLocal } from "src/utils/time";

export const EventCard = ({ event, onClick }: { event: IEvent, onClick: () => void }) => {
  const { title, date, poster, location } = event;

  console.log(poster)

  return (
    <div onClick={onClick} className={`container relative cursor-pointer flex flex-col gap-1 p-6 max-w-sm rounded-lg overflow-hidden shadow-lg bg-cardBackground hover:shadow-indigo-600 hover:shadow-md`} >
      <div className="relative block h-32 group">
        <Image className="h-full" loader={() => poster} src={poster} objectFit='cover' layout="fill" alt={'poster'} />
      </div>

      <p className="text-orange text-md font-semibold mt-2">
        {`${dateToLocal(date, 'DD')} ${dateToLocal(date, 'MMMM').substring(0, 3)} ${dateToLocal(date, 'HH:MM A')}`}
      </p>
      <p className="text-white text-md font-semibold">
        {title}
      </p>
      <p className="text-md font-semibold flex flex-row items-center gap-2">
        <AiOutlineVideoCamera color={'white'} />{location}
      </p>
    </div>
  );
};