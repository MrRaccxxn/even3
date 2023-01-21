import { IEvent } from '@/types/models/IEvent';
import { Button } from 'flowbite-react';
import _ from 'lodash';
import Router from 'next/router';
import { useWeb3Auth } from 'src/contexts/web3AuthContext';
import { EventCardProfile } from "./EventCardProfile";

export const EventListProfile = ({ events, address }: { events: Array<IEvent>, address: string }) => {
    //TODO: reorder this component to avoid drilling
    const { publicKey } = useWeb3Auth();
    const isTheOwnerOfAccout = publicKey === address;

    return (
        <>
            <div className="flex flex-row justify-between py-8 sm:p-0 sm:pb-4 items-center">
                <h2 className="">
                    {isTheOwnerOfAccout ? 'Your Events 🛰️' : 'Events hosted by this user'}
                </h2>

                {
                    isTheOwnerOfAccout && <Button onClick={() => { Router.replace('/event/register') }} className="font-semibold text-base sm:hidden">
                        Create Event
                    </Button>

                }
            </div>
            <div className="flex flex-col gap-8 items-center pb-4">
                {
                    _.isEmpty(events) ?
                        <div className='h-40 w-full flex justify-center items-center'>
                            <p>
                                No events created by you found. Create an event to display it here.
                            </p>
                        </div>
                        : (
                            events.map((event: IEvent, index: number) => {
                                return <EventCardProfile event={event} key={index} />
                            })
                        )
                }
            </div>

            {
                isTheOwnerOfAccout && <Button onClick={() => { Router.replace('/event/register') }} className="sm:mt-4 hidden font-semibold text-base sm:block">
                    Add Event
                </Button>
            }
        </>

    )
}