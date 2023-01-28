import { RegisterEventContextInterface } from "@/types/context/registerEventContext";
import { IEventForm } from "@/types/models/IEvent";
import { Button, Spinner } from "flowbite-react";
import moment from "moment";
import Router from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterEventContext } from "src/contexts/registerEventContext";
import { useWeb3Auth } from "src/contexts/web3AuthContext";
import { createEvent } from "src/services/lib";
import { dateToLocal } from "src/utils/time";
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
        let response;

        switch (step) {
            case 1:
                if (requirePoap) {
                    if (!data.poster[0]) {
                        toast({ type: 'error', message: 'Please add a poster for your event' });
                        setIsSubmitting(false)
                        return
                    }

                    setEventData(data);
                    setStep(2)
                    setIsSubmitting(false);
                    return;
                } else {
                    if (publicKey !== '' && user) {
                        const formData = new FormData()

                        formData.append('files', data.poster[0], data.poster[0].name);
                        formData.append('title', data.title);
                        formData.append('description', data.description);
                        formData.append('date', dateToLocal(data.date, 'YYYY-MM-DDTHH:mm:ss.000Z'));
                        formData.append('eventLink', data.eventLink);
                        formData.append('ownerEmail', user?.email || '');
                        formData.append('ownerAddress', publicKey || '');
                        formData.append('ownerNickName', user?.name || '');
                        response = await createEvent(formData)
                    }
                    setIsSubmitting(false)
                }
                break;

            case 2:
                if (!requirePoap) break;
                else {

                    if (!data.badgeImage) {
                        toast({ type: 'error', message: 'Please add a poap image for your event' });
                        setIsSubmitting(false)
                        return
                    }

                    if (publicKey !== '' && user && data.badgeImage) {
                        const formData = new FormData()

                        formData.append('files', eventData.poster[0], eventData.poster[0].name);
                        formData.append('files', data.badgeImage[0], data.badgeImage[0].name);
                        formData.append('title', eventData.title);
                        formData.append('requirePoap', requirePoap.toString());
                        formData.append('description', eventData.description);
                        formData.append('date', moment(eventData.date).format());
                        formData.append('eventLink', eventData.eventLink || "");
                        formData.append('ownerEmail', user?.email || '');
                        formData.append('ownerAddress', publicKey || '');
                        formData.append('ownerNickName', user?.name || '');
                        response = await createEvent(formData)
                    }
                    setIsSubmitting(false)
                }
                break;

            default:
                break;
        }

        if (response?.status === 200) {
            toast({ type: 'success', message: 'You have successfully submitted the form' });
            Router.replace(`/event/${response?.data?.id}`)
        }
        else
            toast({ type: 'error', message: 'Something were wrong submitting your event' });
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
                                <Button onClick={() => setStep(1)} className="w-fit self-end bg-transparent" color={'info'} disabled={isSubmitting}><span className="font-semibold text-base mx-5">Back</span></Button>
                                <Button onClick={onSubmit} className="w-fit self-end" disabled={isSubmitting}>
                                    {
                                        !isSubmitting ? <span className="font-semibold text-base mx-5">Create Event</span> : <div className="text-white"><Spinner /></div>
                                    }
                                </Button>
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