import { ContainerX } from "src/components/Layout/Container";
import { Loader } from "src/components/Loader";
import { useEvent } from "src/hooks/models/useEvent";
import { EventListProfile } from "./components/EventListProfile";
import { UserStats } from "./components/UserStats";

export const Profile = ({ address = '' }: { address: string }) => {
    const { events, isLoading } = useEvent({ filter: { owner: address } });

    return (
        <>
            <main className="profile-page">
                <section className="relative block h-128 md:h-96 sm:h-72">
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage:
                                "url('/assets/img/illustrations/profile-background.jpg')"
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
                                    <div className="flex flex-wrap justify-center sm:flex-col-reverse sm:content-around">
                                        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center mb-16">
                                            <div className="relative">
                                                <img
                                                    src="./assets/img/illustrations/raccoon.png"
                                                    alt="user"
                                                    className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                                                    style={{ maxWidth: "150px" }}
                                                />
                                            </div>
                                        </div>
                                        <UserStats />
                                    </div>

                                    {
                                        isLoading ?
                                            <Loader /> :
                                            <EventListProfile events={events || []} address={address} />
                                    }
                                </div>
                            </ContainerX>
                        </div>
                    </div>
                </section>
            </main >
        </>
    );
}
