import { ContainerX } from "src/components/Layout/Container";
import { Loader } from "src/components/Loader";
import { useEvent } from "src/hooks/models/useEvent";
import { usePoap } from "src/hooks/models/usePoap";
import { PoapList } from "./components/PoapList";

export const Profile = ({ address = '' }: { address: string }) => {
    const { events, isLoading } = useEvent({ filter: { owner: address } });
    const { poaps } = usePoap({ address });

    return (
        <>
            <main className="profile-page">
                <section className="relative block h-72 sm:h-44 top-0">
                    <div
                        className="absolute w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage:
                                "url('/assets/img/illustrations/profile-background.jpg')"
                        }}
                    >
                        <span
                            id="blackOverlay"
                            className="w-full h-72 sm:h-44 absolute opacity-50 bg-black"
                        ></span>
                    </div>
                    <div className="absolute bottom-0 bg-red w-full flex translate-y-20">
                        <img
                            src="./assets/img/illustrations/raccoon.png"
                            alt="user"
                            className="rounded-full border-none mx-auto"
                            style={{ maxWidth: "150px" }}
                        />
                    </div>
                </section>
                <section className="pt-16 mx-auto mb-16">
                    <div className=" flex flex-col min-w-0 w-full rounded-lg">
                        <ContainerX>
                            {
                                isLoading ?
                                    < div className="flex justify-center mt-48"><Loader fillScreen={true} /></div>
                                    :
                                    // <EventListProfile events={events || []} address={address} />
                                    poaps && <PoapList poaps={poaps} />
                            }
                        </ContainerX>
                    </div>
                </section>
            </main >
        </>
    );
}
