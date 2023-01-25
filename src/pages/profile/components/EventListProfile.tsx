import { IEvent } from '@/types/models/IEvent';
import { Button } from 'flowbite-react';
import _ from 'lodash';
import Router, { useRouter } from 'next/router';
import { Loader } from 'src/components/Loader';
import { useWeb3Auth } from 'src/contexts/web3AuthContext';
import { useEvent } from 'src/hooks/models/useEvent';
import { useUser } from 'src/hooks/models/useUser';
import { dateToLocal } from 'src/utils/time';
import { EventCardProfile } from './EventCardProfile';

export const EventListProfile = ({ address }: { address: string }) => {
    //TODO: reorder this component to avoid drilling
    const { publicKey } = useWeb3Auth();
    const { users } = useUser({ filter: { address } });
    const { events, isLoading } = useEvent({ filter: { owner: users && users[0]?.id ? users[0].id : '' } });
    const router = useRouter();
    const isTheOwnerOfAccout = publicKey === address;

    const orderedByMonths = _.groupBy(events, function (element) {
        return dateToLocal(element.date, 'YYYY-MM-DD').substring(0, 7);
    });

    const orderedByYears = _.groupBy(orderedByMonths, function (month) {
        return dateToLocal(month[0].date, 'YYYY').substring(0, 4);
    });

    const years = Object.keys(orderedByYears);

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
                    isLoading ? <div className="mt-52">
                        <Loader fillScreen={true} />
                    </div> :
                        !events || _.isEmpty(events) ?
                            <div className='h-40 w-full flex justify-center items-center'>
                                <p>
                                    No events created by you found. Create an event to display it here.
                                </p>
                            </div>
                            : (
                                years.map((year: any) => {
                                    return <div key={year}>
                                        <h2>{year}</h2>
                                        {
                                            orderedByYears[year].map((month: any) => {
                                                return <div key={month[0].date}>
                                                    <p>{dateToLocal(month[0].date, 'MMMM')}</p>
                                                    <div className="max-w-3xl md:max-w-md sm:max-w-sm">
                                                        {
                                                            month.map((event: IEvent) => {
                                                                return <>
                                                                    <div className="p-3" key={event.id}>
                                                                        <a
                                                                            target="_blank" rel="noopener noreferrer"
                                                                            href={`${process.env.NEXT_PUBLIC_BASE_URL}/${event.id}`}
                                                                            style={{ cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>🥳</text></svg>")  16 0,  auto` }}
                                                                        >
                                                                            <EventCardProfile event={event} key={event.id} onClick={() => { router.push(`/event/${event.id}`) }} />
                                                                        </a>
                                                                    </div>
                                                                </>
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
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