import { IEvent } from "@/types/models/IEvent";
import classNames from "classnames";
import { Avatar, Button } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RiNumbersLine } from 'react-icons/ri';
import { ContainerX } from "src/components/Layout/Container";
import { useWeb3Auth } from "src/contexts/web3AuthContext";
import { useUser } from "src/hooks/models/useUser";
import { useToast } from "src/hooks/useToast";
import { dateToLocal } from 'src/utils/time';
import { Calendar } from "./components/Calendar";
import { RegisterAttendee } from "./components/RegisterAttendee";
import { ShareEventModal } from "./components/ShareEventModal";

export const EventDetail = ({ event = null }: { event: IEvent | null }) => {
    if (event === null) return <></>
    const toast = useToast();

    const { user, publicKey } = useWeb3Auth()
    const { poster, title, description, date, requirePoap, eventAddress, location, owner } = event;
    const [scrollIsAtBottom, setScrollIsAtBottom] = useState(false)
    const [alreadyRegistered, setAlreadyRegistered] = useState<boolean | undefined>(false);
    const [isEventOwner, setIsEventOwner] = useState<boolean>(false);
    const [openShareModal, setOpenShareModal] = useState(false);
    const router = useRouter();

    const { users, refetch } = useUser({ filter: { address: publicKey } })

    useEffect(() => {
        const getUser = async () => {
            await refetch();
            if (users && users[0]?.id === owner) setIsEventOwner(true)
        }

        getUser();
    }, [users]);

    useEffect(() => {
        if ((users && event.owner === users[0]?.id)) setIsEventOwner(true)
        const response = event.attendees?.some((item: any) => item?.email === user?.email || item?.address === publicKey)
        if (response)
            setAlreadyRegistered(true)
    }, []);

    const handleScroll = () => {
        let documentHeight = document.body.scrollHeight;
        let currentScroll = window.scrollY + window.innerHeight;
        if (currentScroll >= documentHeight) {
            setScrollIsAtBottom(true)
            return
        }

        setScrollIsAtBottom(false)
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    })

    return <>
        <ShareEventModal open={openShareModal} onClose={() => setOpenShareModal(false)} eventTitle={title} />
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
                            <h2>{title}</h2>
                            <h3>Description</h3>
                            <p>{description}</p>
                        </div>
                    </div>
                    <div className="pl-8 w-2/6 md:w-full md:pl-0 flex flex-col gap-8">
                        <div className="flex flex-col gap-3 items-start">
                            <h3>Organizer</h3>
                            <Avatar
                                img="/assets/img/illustrations/raccoon.png"
                                rounded={true}
                                onClick={users && users[0]?.address ? () => { router.replace(`/${users && users[0]?.address ? users[0]?.address : ''}`) } : () => { }}
                                className={classNames([
                                    users && users[0]?.address ? 'cursor-pointer' : '',
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
                            {
                                isEventOwner ?
                                    <>
                                        <Button onClick={() => router.push(`/event/${event.id}/statistics`)} color={'grey'} className='text-white' ><RiNumbersLine className="text-white only:text-xl" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See stadistics</Button>
                                    </> : <></>
                            }
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

            <section className="mt-8 sticky bottom-0 mix-blend-normal py-4 align-middle" style={{ borderTop: `3px solid ${scrollIsAtBottom ? 'transparent' : '#232327'}`, backgroundColor: `${scrollIsAtBottom ? 'transparent' : '#0e0404'}` }}>
                <ContainerX>
                    <div className="flex flex-row md:flex-col justify-between gap-16 md:gap-2">
                        <div className="w-4/6 md:w-full flex flex-col gap-2">
                            <p >{dateToLocal(date[0], 'MMMM').substring(0, 3)} {dateToLocal(date[0], 'DD')} {dateToLocal(date[0], 'YYYY')} {dateToLocal(date[0], 'HH:mm A')}</p>
                            <p className="text-white">{title}</p>
                        </div>

                        <div className="pl-8 md:w-full md:p-0 w-2/6 flex flex-row gap-6 items-center">
                            <Button size={'lg'} color={'gray'} outline={true} className="font-semibold" onClick={() => setOpenShareModal(!openShareModal)}>Share this event</Button>
                            {
                                !alreadyRegistered && !isEventOwner && <RegisterAttendee event={event} />
                            }
                        </div>
                    </div>
                </ContainerX>
            </section>
        </main >
    </>
}