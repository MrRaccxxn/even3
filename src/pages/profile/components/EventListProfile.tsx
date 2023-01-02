import { IEvent } from '@/types/models/IEvent';
import { Button } from 'flowbite-react';
import _ from 'lodash';
import Router from 'next/router';
import { EventCardProfile } from "./EventCardProfile";

export const EventListProfile = ({ events }: { events: Array<IEvent> }) => {
    return (
        <>
            <div className="flex flex-row justify-between py-8 sm:p-0 sm:pb-4 items-center">
                <h2 className="">
                    Your Events 🛰️
                </h2>

                <Button onClick={() => { Router.replace('/event/register') }} className="font-semibold text-base sm:hidden">
                    Add Event
                </Button>
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

            <Button onClick={() => { Router.replace('/event/register') }} className="sm:mt-4 hidden font-semibold text-base sm:block">
                Add Event
            </Button>
        </>

    )
}