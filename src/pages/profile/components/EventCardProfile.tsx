import { IEvent } from "@/types/models/IEvent";
import { AiOutlineVideoCamera } from 'react-icons/ai';
import { dateToLocal } from "src/utils/time";

export const EventCardProfile = ({ event, onClick }: { event: IEvent, onClick: () => void }) => {
    const { title, date, poster, location } = event;

    return (
        <div onClick={onClick} className={`container relative cursor-pointer flex flex-row sm:flex-col gap-8 sm:gap-1 p-6 rounded-lg overflow-hidden shadow-lg hover:shadow-indigo-600 hover:shadow-md`} >
            <div className="bg-cover bg-no-repeat bg-center rounded-lg h-40 sm:h-full w-2/5 sm:w-full" style={{ backgroundImage: poster ? `url("${poster}")` : 'none' }}>
                <div className="relative block h-full group">
                    <div className={`h-32`}></div>
                </div>
            </div>
            <div className="flex flex-col gap-1 justify-center w-3/5 sm:w-full">
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
        </div>
    );
}