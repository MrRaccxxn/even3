import { useForm } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { DragAndDrop } from "../../../../components/form/DragAndDrop";
import { FormInput } from "../../../../components/form/FormInput";
import { createEvent } from "../../../../services/lib/event";

export type RegistrationFormFields = {
    title: string;
    description: string;
    startDate: string;
    finalDate: string;
    poster: any;
};

export const RegisterEventForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationFormFields>();

    const onSubmit = handleSubmit(async (data) => {
        console.log('submitting...');
        console.log(data)
        await createEvent(data)
    });

    return <form onSubmit={onSubmit} className="flex mb-4 w-full gap-16 sm:flex-col">
        <DragAndDrop register={register} className='w-2/5 self-start sm:w-full' inputName={'poster'} />
        <div className="flex flex-col justify-between w-3/5 sm:w-full">
            <div className="flex flex-col gap-3 ">
                <FormInput<RegistrationFormFields>
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

                <FormInput<RegistrationFormFields>
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

                <div className="flex items-center">
                    <span className="mx-4 text-gray-500">from</span>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                        </div>

                        <FormInput<RegistrationFormFields>
                            id="startDate"
                            type="date"
                            name="startDate"
                            label="Start Date"
                            className="mb-2"
                            register={register}
                            rules={{ required: 'You must enter a date.' }}
                            errors={errors}
                            placeholder={""}
                        />
                    </div>
                    <span className="mx-4 text-gray-500">to</span>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                        </div>
                        <FormInput<RegistrationFormFields>
                            id="finalDate"
                            type="date"
                            name="finalDate"
                            label="Final Date"
                            className="mb-2"
                            register={register}
                            rules={{ required: 'You must enter a date.' }}
                            errors={errors}
                            placeholder={""}
                        />
                    </div>
                </div>
            </div>
            <Button>
                Create event
            </Button>
        </div>
    </form>
}