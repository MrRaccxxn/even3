import { IEvent } from "@/types/models/IEvent";
import classNames from "classnames";
import { Avatar } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ContainerX } from "src/components/Layout/Container";
import { Loader } from "src/components/Loader";
import { useWeb3Auth } from "src/contexts/web3AuthContext";
import { useUser } from "src/hooks/models/useUser";
import { dateToLocal } from 'src/utils/time';
import { Calendar } from "../EventDetail/components/Calendar";
import { Table } from "./Table";

export const EventStatistics = ({ event = null }: { event: IEvent | null }) => {
    if (event === null) return <></>
    const { publicKey } = useWeb3Auth()
    const { poster, title, date, eventAddress, location, owner, requirePoap } = event;
    const { users, isLoading, refetch } = useUser({ filter: { address: publicKey } })
    const [isEventOwner, setIsEventOwner] = useState<boolean>(false)
    const router = useRouter();

    useEffect(() => {
        if (!users) {
            return;
        } else {
            if (users[0]?.id === owner) setIsEventOwner(true)
        }
        const fetchSomething = async () => {
            refetch()
        }
        fetchSomething()
    }, [users])

    return <>
        <main className="profile-page relative">
            <section className="relative block h-128 md:h-96 sm:h-72">
                <div
                    className="absolute top-0 w-full h-full bg-cover bg-no-repeat bg-center"
                    style={{
                        backgroundImage: poster ? `url("${event.poster}")` : 'none',
                        filter: ' grayscale(100%)'
                    }}
                >
                    <span
                        id="blackOverlay"
                        className="w-full h-full absolute opacity-50 bg-black"
                    >
                    </span>
                </div>
                <div className="flex justify-end w-full max-w-6xl md:w-full mx-auto flex-col relative z-40 h-full">
                    <div className="w-full flow-root max-w-6xl md:w-full mx-auto flex-col absolute z-40 translate-y-10 md:translate-y-5">
                        <a style={{ cursor: requirePoap ? 'pointer' : 'auto', pointerEvents: requirePoap ? 'auto' : 'none' }} href={eventAddress && `https://testnet.arbiscan.io/address/${eventAddress}`} target="_blank"><h1 className="md:hidden">{title}</h1></a>
                        <div className="flex align-bottom justify-end w-100 md:mr-6">
                            <Calendar date={date[0]} />
                        </div>
                    </div>
                </div>
            </section>

            <ContainerX>
                <section className="flex flex-row md:flex-col relativemx-auto mt-16 md:mt-14 gap-16 md:gap-10">
                    <div className="w-4/6 md:w-full flex flex-col gap-8">
                        <div className="flex flex-col gap-3 items-start">
                            {
                                isLoading ? <div>
                                    <Loader />
                                </div>
                                    :
                                    !isEventOwner ? <p>You dont have permissions to see this data</p>
                                        :
                                        <Table attendeesList={event?.attendees || []} eventTitle={event.title} />
                            }
                        </div>
                    </div>
                    <div className="pl-8 w-2/6 md:w-full md:pl-0 flex flex-col gap-8">
                        <div className="flex flex-col gap-3 items-start">
                            <h3>Organizer</h3>
                            <Avatar
                                img="/assets/img/illustrations/raccoon.png"
                                rounded={true}
                                onClick={users && users[0].address ? () => { router.replace(`/${users && users[0].address ? users[0].address : ''}`) } : () => { }}
                                className={classNames([
                                    users && users[0].address ? 'cursor-pointer' : '',
                                ])}
                            >
                                <div className="space-y-1 font-medium">
                                    <div className="text-white">
                                        {users ? users[0]?.nickName : ''}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Dungeon Master
                                    </div>
                                </div>
                            </Avatar>
                        </div>

                        <div className="flex flex-col gap-3 items-start">
                            <h3>Additional Details</h3>
                            <div className="flex flex-row gap-4">
                                <div className="scale-150  w-6 text-center">⏰</div>
                                <p>{dateToLocal(date[0], 'HH:mm')} GTM{dateToLocal(date[0], 'Z z')}</p>
                            </div>

                            <div className="flex flex-row gap-4">
                                <div className="scale-150  w-6 text-center">📍</div>
                                <p>{location}</p>
                            </div>

                            <div className="flex flex-row gap-4">
                                <div className="scale-150  w-6 text-center">🏷️</div>
                                <p>Free</p>
                            </div>
                        </div>
                    </div>
                </section>
            </ContainerX>
        </main >
    </>
}