import { useForm } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { DragAndDrop } from "../../../../components/form/DragAndDrop";
import { FormInput } from "../../../../components/form/FormInput";

export type RegistrationFormFields = {
    title: string;
    symbol: string;
    description: string;
    recipientAddress: string;
};

export const RegisterEventForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationFormFields>();

    const onSubmit = handleSubmit((data) => {
        console.log('submitting...');
        console.log(data);
    });

    return <form onSubmit={onSubmit} className="flex mb-4 w-full gap-16 sm:flex-col">
        <DragAndDrop register={register} className='w-2/5 self-start sm:w-full' inputName={'dragNdrop'} />
        <div className="flex flex-col gap-3 w-3/5 sm:w-full">
            <div className="flex flex-row gap-2 sm:flex-col">
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
                    id="symbol"
                    type="text"
                    name="symbol"
                    label="Symbol"
                    placeholder="Symbol"
                    className="mb-2 sm:w-full"
                    register={register}
                    rules={{ required: 'You must enter a symbol.' }}
                    errors={errors}
                />
            </div>

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

            <FormInput<RegistrationFormFields>
                id="recipientAddress"
                type="text"
                name="recipientAddress"
                label="Recipient Address"
                placeholder="Recipient Address"
                className="mb-2"
                register={register}
                rules={{ required: 'You must enter a recipient address.' }}
                errors={errors}
            />

            <Button>
                Create event
            </Button>
        </div>
    </form>
}