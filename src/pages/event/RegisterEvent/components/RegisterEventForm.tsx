import { IEvent } from "@/types/models/IEvent";
import { Button, Spinner } from "flowbite-react";
import Router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DragAndDrop } from "src/components/form/DragAndDrop";
import { FormInput } from "src/components/form/FormInput";
import { useWeb3Auth } from "src/contexts/web3AuthContext";
import { createEvent } from "src/services/lib/event";
import { useToast } from "../../../../hooks/useToast";

export const RegisterEventForm = () => {
    const { getPublicKey, user } = useWeb3Auth()
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IEvent>();

    const onSubmit = handleSubmit(async (data: any) => {
        setIsSubmitting(true)
        const publicKey = await getPublicKey() || null

        if (publicKey && user) {
            const formData = new FormData()
            formData.append('poster', data.file[0], data.file[0].name);
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('date', data.date);
            formData.append('owner', publicKey || '');
            formData.append('ownerEmail', user?.email || '');

            const response = await createEvent(formData)

            if (response.status === 200) {
                toast({ type: 'success', message: 'You have successfully submitted the form' });
                Router.replace(`/event/${response?.data?.id}`)
            }
            else
                toast({ type: 'error', message: 'Something were wrong submitting your event' });
        } else {
            toast({ type: 'error', message: 'Something were wrong submitting your user' });
        }

        setIsSubmitting(false)
    });

    return <>
        <form onSubmit={onSubmit} className="flex mb-4 w-full gap-16 sm:flex-col">
            <DragAndDrop register={register} className='w-2/5 self-start sm:w-full' inputName={'file'} />
            <div className="flex flex-col justify-between w-3/5 sm:w-full">
                <div className="flex flex-col gap-3 ">
                    <FormInput<IEvent>
                        id="title"
                        type="text"
                        name="title"
                        label="Title *"
                        placeholder="Title"
                        className="mb-2 w-full"
                        register={register}
                        rules={{ required: 'You must enter a title.' }}
                        errors={errors}
                    />

                    <FormInput<IEvent>
                        id="description"
                        type="text"
                        name="description"
                        label="Description"
                        placeholder="Description"
                        className="mb-2"
                        register={register}
                        rules={{ required: 'You must enter a description.' }}
                        errors={errors}
                    />

                    <FormInput<IEvent>
                        id="date"
                        type="date"
                        name="date"
                        label="Date"
                        className="mb-2"
                        register={register}
                        rules={{ required: 'You must enter a date.' }}
                        errors={errors}
                        placeholder={""}
                    />


                </div>

                <Button onClick={onSubmit} type='submit'>
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
                                    <span className="font-semibold text-base">Submitting</span>
                                </> :
                                <span className="font-semibold text-base">Create Event</span>
                        }
                    </>
                </Button>
            </div>
        </form>
    </>
}