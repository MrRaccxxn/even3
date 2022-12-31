import { useEffect, useState } from "react";
import { useWeb3Auth } from "src/contexts/web3AuthContext";
import { getEvents } from "src/services/lib/event";
import { EventCardProfile } from "./EventCardProfile";

export const EventListProfile = () => {
    const { getPublicKey } = useWeb3Auth()
    const [events, setEvents] = useState<[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await getEvents(await getPublicKey());
            setEvents(response.data.reverse());
        }

        fetchEvents()
    }, [])

    return (
        <div className="flex flex-col gap-8 items-center">
            {
                events.map((event, index) => {
                    return <EventCardProfile key={index} event={event} />
                })
            }
        </div>
    )
}