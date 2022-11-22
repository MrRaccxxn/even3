import { useForm } from "react-hook-form";
import { Button } from "../Button";
import { FormInput } from "../form/FormInput";

export type RegistrationFormFields = {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationFormFields>();

    const onSubmit = handleSubmit((data) => {
        console.log('submitting...');
        console.log(data);
    });


    return <form onSubmit={onSubmit} className="flex w-full sm:flex-col">
        <div className="flex flex-col gap-3 sm:w-full">
            <FormInput<RegistrationFormFields>
                id="email"
                type="email"
                name="email"
                label="Email"
                placeholder="Email"
                className="mb-2 w-full"
                register={register}
                rules={{ required: 'You must enter a Email.' }}
                errors={errors}
            />

            <FormInput<RegistrationFormFields>
                id="password"
                type="password"
                name="password"
                label="Password"
                placeholder="Password"
                className="mb-2 w-full"
                register={register}
                rules={{ required: 'You must enter a Password.' }}
                errors={errors}
            />

            <Button>
                Login
            </Button>
        </div>
    </form>
}