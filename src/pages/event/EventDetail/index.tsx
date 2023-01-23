import { IEvent } from "@/types/models/IEvent";
import { Avatar, Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { ContainerX } from "src/components/Layout/Container";
import { useWeb3Auth } from "src/contexts/web3AuthContext";
import { useUser } from "src/hooks/models/useUser";
import { useToast } from "src/hooks/useToast";
import { registerAttendee } from "src/services/lib/audience";
import { hexToBase64 } from "src/utils";
import { dateToLocal } from 'src/utils/time';
import { Calendar } from "./components/Calendar";
import { ShareEventModal } from "./components/ShareEventModal";

export const EventDetail = ({ event = null }: { event: IEvent | null }) => {
    if (event === null) return <></>
    const toast = useToast();

    const { user, publicKey } = useWeb3Auth()
    const { file, title, description, date, id, eventAddress, location, owner } = event;
    const eventOwnerData = useUser({ filter: { id: owner } })
    const [scrollIsAtBottom, setScrollIsAtBottom] = useState(false)
    const [isRegisteringAttendee, setIsRegisteringAttendee] = useState(false);
    const [openShareModal, setOpenShareModal] = useState(false);

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

    const handleRegisterAttende = async () => {
        setIsRegisteringAttendee(true)
        const response = await registerAttendee({ eventId: id, eventAddress: eventAddress || '', attendee: { email: user.email || '', address: publicKey } });
        if (response?.data?.success) {
            toast({ type: 'success', message: `Registered to the event successfully` });
        }
        else
            toast({ type: 'error', message: response?.data?.error });
        setIsRegisteringAttendee(false)
    }

    return <>
        <ShareEventModal open={openShareModal} onClose={() => setOpenShareModal(false)} eventTitle={title} />
        <main className="profile-page relative">
            <section className="relative block h-128 md:h-96 sm:h-72">
                <div
                    className="absolute top-0 w-full h-full bg-cover bg-no-repeat bg-center"
                    style={{
                        backgroundImage: file ? `url(data:image/png;base64,${hexToBase64(file?.data)})` : 'none',
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
                        <a style={{ cursor: 'pointer' }} href={eventAddress ? `https://testnet.arbiscan.io/address/${eventAddress}` : ''} target="_blank"><h1 className="md:hidden">{title}</h1></a>
                        <div className="flex align-bottom justify-end w-100 md:mr-6">
                            <Calendar date={date} />
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
                            >
                                <div className="space-y-1 font-medium">
                                    <div className="text-white">
                                        {eventOwnerData?.users ? eventOwnerData.users[0]?.nickName : ''}
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
                                <p>{dateToLocal(date, 'HH:MM')} GTM{dateToLocal(date, 'Z z')}</p>
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
                            <p >{dateToLocal(date, 'MMMM').substring(0, 3)} {dateToLocal(date, 'DD')} {dateToLocal(date, 'YYYY')} {dateToLocal(date, 'HH:MM A')}</p>
                            <p className="text-white">{title}</p>
                        </div>

                        <div className="pl-8 md:w-full md:p-0 w-2/6 flex flex-row gap-6 items-center">
                            <Button size={'lg'} color={'gray'} outline={true} className="font-semibold" onClick={() => setOpenShareModal(!openShareModal)}>Share this event</Button>
                            {
                                publicKey && <Button size={'lg'} className="font-semibold" onClick={handleRegisterAttende} disabled={isRegisteringAttendee} type='submit'>
                                    <>
                                        {
                                            isRegisteringAttendee ?
                                                <>
                                                    <div className="mr-3">
                                                        <Spinner
                                                            size="sm"
                                                            light={true}
                                                        />
                                                    </div>
                                                </> :
                                                <span className="font-semibold text-base">Register</span>
                                        }
                                    </>
                                </Button>
                            }
                        </div>
                    </div>
                </ContainerX>
            </section>

        </main >
    </>
}