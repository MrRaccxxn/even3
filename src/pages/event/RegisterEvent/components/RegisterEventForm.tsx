import { useForm } from "react-hook-form";
import { Button } from "../../../../components/Button";
import { DragAndDrop } from "../../../../components/form/DragAndDrop";
import { Input } from "../../../../components/form/Input";

export type RegistrationFormFields = {
    title: string;
    symbol: string;
    description: string;
    recipientAddress: string;
};

export const RegisterEventForm = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<RegistrationFormFields>()

    const onSubmit = handleSubmit((data) => {
        console.log('submitting...');
        console.log(data);
    });

    return <form onSubmit={onSubmit} className="flex mb-4 w-full gap-16">
        <DragAndDrop register={register} className={'w-2/5 self-start'} inputName={'dragNdrop'} />
        <div className="flex flex-col gap-3 w-3/5">
            <div className="flex flex-row gap-2">
                <Input
                    id="title"
                    type="text"
                    name="title"
                    label="Title"
                    placeholder="Title"
                />
                <Input
                    id="symbol"
                    type="text"
                    name="symbol"
                    label="Symbol"
                    placeholder="Symbol"
                />
            </div>

            <Input
                id="description"
                type="text"
                name="description"
                label="Description"
                placeholder="Description"
            />
            <Input
                id="recipientAddress"
                type="text"
                name="recipientAddress"
                label="Recipient Address"
                placeholder="Recipient Address"
            />
            <Button>
                Create event
            </Button>
        </div>
    </form>
}