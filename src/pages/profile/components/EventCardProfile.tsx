import { IEvent } from "@/types/models/IEvent";
import Router from "next/router";
import { hexToBase64 } from "src/utils";

export const EventCardProfile = ({ event }: { event: IEvent }) => {
    const { id, title, description, file } = event;

    return <a onClick={() => Router.replace(`event/${id}`)} className="cursor-pointer">
        <div className="flex flex-row items-center md:flex-col gap-4">
            <div className="w-1/6 md:w-full overflow-hidden flex justify-center" style={{ height: '80px' }}>
                <img width='160' height='80' className=" top-0 left-0 bg-cover bg-no-repeat bg-center rounded" src={`data:image/png;base64,${hexToBase64(file?.data)}`} alt="Background Event" />
            </div>

            <div className="w-5/6 md:w-full">
                <h3 >
                    {title}
                </h3>
                <p>
                    {description}
                </p>
            </div>
        </div>
    </a>

}