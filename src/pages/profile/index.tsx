import { ContainerX } from "src/components/Layout/Container";
import { usePoap } from "src/hooks/models/usePoap";
import { EventListProfile } from "./components/EventListProfile";

export const Profile = ({ address = '' }: { address: string }) => {
    const { poaps } = usePoap({ address });

    return (
        <>
            <main className="profile-page">
                <section className="relative block h-72 sm:h-44 top-0 mb-24">
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
                <section className="mx-auto mb-16">
                    <div className=" flex flex-col min-w-0 w-full rounded-lg">
                        <ContainerX>
                            {
                                <EventListProfile address={address} />
                            }
                            {/* {
                                isLoading ?
                                    < div className="flex justify-center mt-48"><Loader fillScreen={true} /></div>
                                    :
                                    
                                    !poaps || _.isEmpty(poaps) ?
                                        <div className="flex flex-col items-center w-full mt-32 sm:mt-7 gap-8">
                                            <ImFileEmpty className="text-5xl" color="white" />
                                            <p>There are no poaps found for this wallet : </p>
                                            <p>{address}</p>
                                        </div>
                                        :
                                        <PoapList poaps={poaps} />
                            } */}
                        </ContainerX>
                    </div>
                </section>
            </main >
        </>
    );
}
