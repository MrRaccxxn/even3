import { RegisterEventContextInterface } from "@/types/context/registerEventContext";
import { IEventForm } from "@/types/models/IEvent";
import { Button, Spinner } from "flowbite-react";
import moment from 'moment';
import Router from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterEventContext } from "src/contexts/registerEventContext";
import { useWeb3Auth } from "src/contexts/web3AuthContext";
import { createEvent } from "src/services/lib/event";
import { useToast } from "../../../../hooks/useToast";
import { BasicInfoForm } from "../sections/BasicInfoForm";
import { PoapDataForm } from "../sections/PoapDataForm";

export const RegisterEventForm = () => {
    const { publicKey, user } = useWeb3Auth()
    const { requirePoap, setRequirePoap, eventData, setEventData, step, setStep } = useContext(RegisterEventContext) as RegisterEventContextInterface
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IEventForm>();

    const onSubmit = handleSubmit(async (data: any) => {
        setIsSubmitting(true)

        if (requirePoap && step === 1) {
            if (!data.poster[0]) {
                toast({ type: 'error', message: 'Please add a poster for your event' });
                setIsSubmitting(false)
                return
            }

            setEventData(data);
            setStep(2)
        }

        if (requirePoap && step === 2 || !requirePoap && step === 1) {
            if (publicKey !== '' && user) {
                const formData = new FormData()
                formData.append('poster', data.poster[0], data.poster[0].name);
                formData.append('title', data.title);
                formData.append('description', data.description);
                formData.append('date', moment(data.date).format());
                formData.append('ownerEmail', user?.email || '');
                formData.append('ownerAddress', publicKey || '');
                formData.append('ownerNickName', user?.name || '');

                const response = await createEvent(formData)

                if (response?.status === 200) {
                    toast({ type: 'success', message: 'You have successfully submitted the form' });
                    Router.replace(`/event/${response?.data?.id}`)
                }
                else
                    toast({ type: 'error', message: 'Something were wrong submitting your event' });
            } else {
                toast({ type: 'error', message: 'Something were wrong submitting your user' });
            }

        }
        setIsSubmitting(false)
    });

    return <div className="w-full pt-24 sm:pt-16 mt-8 mb-16">
        <form onSubmit={onSubmit} className="flex flex-col mb-4 w-full sm:flex-col items-center">
            {step === 1 && <BasicInfoForm register={register} errors={errors} onSubmit={onSubmit} isSubmitting={isSubmitting} />}
            {step === 2 && <PoapDataForm register={register} errors={errors} onSubmit={onSubmit} isSubmitting={isSubmitting} />}
            <div className="pt-8 w-3/4 sm:w-full flex flex-col items-end">
                {
                    requirePoap ? (
                        <>
                            {step === 1 && <Button onClick={onSubmit} className="w-fit self-end"><span className="font-semibold text-base mx-5">Next</span></Button>}
                            {step === 2 && <div className="w-full flex flex-row justify-between">
                                <Button onClick={() => setStep(1)} className="w-fit self-end bg-transparent" color={'info'}><span className="font-semibold text-base mx-5">Back</span></Button>
                                <Button onClick={onSubmit} className="w-fit self-end"><span className="font-semibold text-base mx-5">Create Event</span></Button>
                            </div>}
                        </>
                    ) :
                        (
                            <Button onClick={onSubmit} disabled={isSubmitting} type='submit' className="w-fit self-end">
                                <>
                                    {
                                        isSubmitting ?
                                            <>
                                                <div className="mr-3">
                                                    <Spinner
                                                        size="sm"
                                                        light={true}
                                                    />
                                                </div>
                                                <span className="font-semibold text-base">Loading</span>
                                            </> :
                                            <span className="font-semibold text-base">Create Event</span>
                                    }
                                </>
                            </Button>
                        )
                }
            </div>
        </form >
    </div >
}