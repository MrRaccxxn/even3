import { IEventForm } from "@/types/models/IEvent";
import { Button, Label, Spinner } from "flowbite-react";
import moment from 'moment';
import Router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DragAndDrop } from "src/components/form/DragAndDrop";
import { FormInput } from "src/components/form/FormInput";
import { useWeb3Auth } from "src/contexts/web3AuthContext";
import { createEvent } from "src/services/lib/event";
import { useToast } from "../../../../hooks/useToast";

export const RegisterEventForm = () => {
    const { publicKey, user } = useWeb3Auth()
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [eventRequirePoap, setEventRequirePoap] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IEventForm>();

    const onSubmit = handleSubmit(async (data: any) => {
        setIsSubmitting(true)

        if (!data.poster[0]) {
            toast({ type: 'error', message: 'Please add a poster for your event' });
            setIsSubmitting(false)
            return
        }

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

        setIsSubmitting(false)
    });

    const handleCheckbox = (e: any) => {
        setEventRequirePoap(e.target.checked)
    }

    return <div className="h-full w-full">
        <form onSubmit={onSubmit} className="flex mb-4 w-full gap-16 sm:flex-col mt-32">
            <div className="w-2/5 sm:w-full self-center">
                <DragAndDrop register={register} inputName={'poster'} className={""} />
            </div>
            <div className="flex flex-col justify-between w-3/5 sm:w-full">
                <div className="flex flex-col gap-3 mb-4">
                    <div>
                        <div className="block text-white">
                            <Label
                                htmlFor="email"
                                value="Event Title *"
                                color={'white'}
                            />
                        </div>
                        <FormInput<IEventForm>
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
                    </div>

                    <div>
                        <div className="block text-white">
                            <Label
                                htmlFor="email"
                                value="What is the event about *"
                                color={'white'}
                            />
                        </div>
                        <FormInput<IEventForm>
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
                    </div>

                    <div>
                        <div className="block text-white">
                            <Label
                                htmlFor="email"
                                value="Date and time*"
                                color={'white'}
                            />
                        </div>
                        <FormInput<IEventForm>
                            id="date"
                            type="datetime-local"
                            name="date"
                            label="Date"
                            min={moment().format('YYYY-MM-DDThh:mm')}
                            className="mb-2"
                            register={register}
                            rules={{ required: 'You must enter a date.' }}
                            errors={errors}
                            placeholder={""}
                        />
                    </div>

                    <div>
                        <div className="block text-white">
                            <Label
                                htmlFor="email"
                                value="Event link *"
                                color={'white'}
                            />
                        </div>
                        <FormInput<IEventForm>
                            id="eventLink"
                            type="text"
                            name="eventLink"
                            label="Description"
                            placeholder="Google meets, Zoom, etc"
                            className="mb-2"
                            register={register}
                            rules={{ required: 'You must enter a description.' }}
                            errors={errors}
                        />
                    </div>

                    <div className="flex flex-row">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" onChange={e => handleCheckbox(e)} />
                            <div className="self-baseline w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                        <div className="block text-white ml-4">
                            <Label
                                htmlFor="email"
                                value="Require POAPs?"
                                color={'white'}
                            />
                        </div>
                    </div>
                </div>

                {
                    eventRequirePoap ? (
                        <Button><span className="font-semibold text-base">Next</span></Button>
                    ) :
                        (
                            <Button onClick={onSubmit} disabled={isSubmitting} type='submit'>
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
        </form>
    </div>
}