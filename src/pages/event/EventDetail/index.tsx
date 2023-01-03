import { IEvent } from "@/types/models/IEvent"
import moment from "moment"
import { ContainerX } from "src/components/Layout/Container"
import { hexToBase64 } from "src/utils"

export const EventDetail = ({ event = null }: { event: IEvent | null }) => {

    if (event === null) return <></>

    const { file, title, description, date } = event;

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
                                        <h3>{`${moment(date).format('MMMM')} ${moment(date).day() + 1}`}</h3>
                                        <p>{description}</p>
                                    </div>
                                </div>
                            </div>
                        </ContainerX>
                    </div>
                </div>
            </section>
        </main >
    </>
}