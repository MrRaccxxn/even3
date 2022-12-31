import { Button } from "flowbite-react";
import Router from "next/router";
import { ContainerX } from "src/components/Layout/Container";
import { Loader } from "src/components/Loader";
import { useWeb3Auth } from "src/contexts/web3AuthContext";
import { EventListProfile } from "./components/EventListProfile";

export const Profile = () => {
    const { isLoading } = useWeb3Auth()

    if (isLoading) return <Loader />

    return (
        <>
            <main className="profile-page">
                <section className="relative block h-128  md:h-96 sm:h-72">
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
                <section className="relative pt-16 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-buttonBackgroundSecondary w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <ContainerX>
                                <div className="p-6">
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
                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                                <div className="w-24 p-3 text-center">
                                                    <p className="text-headline text-xl font-bold block uppercase tracking-wide">
                                                        22
                                                    </p>
                                                    <p className="text-sm ">Events</p>
                                                </div>
                                                <div className="w-24 p-3 text-center">
                                                    <p className="text-headline text-xl font-bold block uppercase tracking-wide">
                                                        10
                                                    </p>
                                                    <p className="text-sm ">Followers</p>
                                                </div>
                                                <div className="w-24 p-3 text-center">
                                                    <p className=" text-headline text-xl font-bold block uppercase tracking-wide ">
                                                        89
                                                    </p>
                                                    <p className="text-sm">Assits</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-row justify-between p-8 sm:p-0 sm:pb-4 items-center">
                                        <h2 className="">
                                            Your Events 🛰️
                                        </h2>

                                        <Button onClick={() => { Router.replace('/event/register') }} className="font-semibold text-base sm:hidden">
                                            Add Event
                                        </Button>
                                    </div>
                                    <EventListProfile />

                                    <Button onClick={() => { Router.replace('/event/register') }} className="sm:mt-4 hidden font-semibold text-base sm:block">
                                        Add Event
                                    </Button>
                                </div>
                            </ContainerX>
                        </div>
                    </div>
                </section>
            </main >
        </>
    );
}
