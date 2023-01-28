import { ErrorMessage } from "@hookform/error-message";
import { Spinner } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ContainerX } from "src/components/Layout/Container";
import { usePoap } from "src/hooks/models/usePoap";
import { PoapList } from "./PoapList";

interface IPoapSearcher {
    address: string;
}

export const PoapSearcher = () => {
    const vitalikAddress = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
    const [walletAddress, setWalletAddress] = useState<string>(vitalikAddress);
    const { poaps, isLoading } = usePoap({ address: walletAddress });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IPoapSearcher>();

    const onSubmit = handleSubmit(async (data: IPoapSearcher) => {
        setWalletAddress(data.address)
    })

    return (
        <>
            <main className="profile-page">
                <section className="relative block h-72 sm:h-44 top-0 mb-24 verflow-hidden" >
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
                            <div>
                                <h2>Poap searcher 🕺🏻</h2>
                                {
                                    walletAddress === vitalikAddress ? <p className="w-full text-center p-2">The poaps that you are seeing now belongs to <span>Vitalik Butterin 👀</span></p>
                                        : <></>
                                }
                                <div className="flex justify-center w-full py-3">
                                    <div className="mb-3 w-3/6">
                                        <div className="input-group relative flex w-full mb-4 gap-2">
                                            <input
                                                type="text"
                                                defaultValue={walletAddress}
                                                className="bg-transparent form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-300 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-200  focus:border-blue-600 focus:outline-none" placeholder="0x..." aria-label="Search" aria-describedby="button-addon2"
                                                {...(register && register('address', { required: 'You must enter a valid Ethereum wallet address.', pattern: { value: /^(0x){1}[0-9a-fA-F]{40}$/i, message: "Invalid ethereum address" } }))}
                                            />

                                            <button disabled={isLoading} onClick={onSubmit} type='submit' className="btn inlineBlock px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out flex items-center" id="button-addon2">
                                                {
                                                    isLoading ? <Spinner size={'sm'} /> : <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                                    </svg>
                                                }
                                            </button>
                                        </div>

                                        <ErrorMessage
                                            errors={errors}
                                            name={'address' as any}
                                            render={({ message }: { message: string }) => (
                                                <p className="mt-1 text-sm text-left block text-red-500">
                                                    {message}
                                                </p>
                                            )}
                                        />
                                    </div>
                                </div>
                                <PoapList poaps={poaps || []} />
                            </div>
                        </ContainerX>
                    </div>
                </section>
            </main >
        </>
    );
}