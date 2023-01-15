import { IEvent } from "@/types/models/IEvent"
import { Button, Spinner } from "flowbite-react"
import moment from "moment"
import { useState } from "react"
import { ContainerX } from "src/components/Layout/Container"
import { useWeb3Auth } from "src/contexts/web3AuthContext"
import { useToast } from "src/hooks/useToast"
import { registerAttendee } from "src/services/lib/audience"
import { hexToBase64 } from "src/utils"

export const EventDetail = ({ event = null }: { event: IEvent | null }) => {
    if (event === null) return <></>

    const toast = useToast();
    const { user, publicKey } = useWeb3Auth()
    const { file, title, description, date, id } = event;
    const [isRegisteringAttendee, setIsRegisteringAttendee] = useState(false);

    const handleRegisterAttende = async () => {
        setIsRegisteringAttendee(true)
        const response = await registerAttendee({ eventId: id, attendee: { email: user.email || '', address: publicKey } });
        if (response?.data?.success)
            toast({ type: 'success', message: `Registered to the event successfully` });
        else
            toast({ type: 'error', message: response?.data?.error });
        setIsRegisteringAttendee(false)
    }

    return <>
        <main className="profile-page">
            <section className="relative block h-128 md:h-96 sm:h-72">
                <div
                    className="absolute top-0 w-full h-full bg-cover bg-no-repeat bg-center"
                    style={{
                        backgroundImage: file ? `url(data:image/png;base64,${hexToBase64(file?.data)})` : 'none'
                    }}
                >
                    <span
                        id="blackOverlay"
                        className="w-full h-full absolute opacity-50 bg-black"
                    ></span>
                </div>

            </section>
            <section className="relative pt-16 bg-background mx-auto mb-16">
                <div className="container px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-buttonBackgroundSecondary w-full shadow-xl rounded-lg -mt-64">
                        <ContainerX>
                            <div className="p-6 flow-root sm:text-center h-full">
                                <div className="flex flex-wrap justify-center sm:flex-col-reverse sm:content-around mb-16">
                                    <div className="relative flex flex-col gap-6 text-start w-full">
                                        <h1>{title}</h1>
                                        <h3>{`${moment(date, 'YYYY-MM-DDTHH:mm:ss').format("MMMM Do")}`}</h3>
                                        <p>{description}</p>
                                    </div>
                                </div>

                                {
                                    publicKey && <Button onClick={handleRegisterAttende} disabled={isRegisteringAttendee} type='submit'>
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
                                                        <span className="font-semibold text-base">Registering</span>
                                                    </> :
                                                    <span className="font-semibold text-base">Write me down!</span>
                                            }
                                        </>
                                    </Button>
                                }
                            </div>
                        </ContainerX>
                    </div>
                </div>
            </section>
        </main >
    </>
}