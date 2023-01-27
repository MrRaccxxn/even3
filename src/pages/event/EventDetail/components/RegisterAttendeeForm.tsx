import { IEvent } from "@/types/models/IEvent";
import { Button, Label, Modal, Spinner } from "flowbite-react";
import _ from "lodash";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "src/components/form/FormInput";
import { useWeb3Auth } from "src/contexts/web3AuthContext";
import { useEventMutation } from "src/hooks/models/useEvent";
import { useToast } from "src/hooks/useToast";

type IAttendeeRegister = {
    email: string;
    wallet?: string;
}

export const RegisterAttendeeModal = ({ open, onClose, event }: { open: boolean, onClose: () => void, event: IEvent }) => {
    const { login, user, publicKey } = useWeb3Auth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const toast = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IAttendeeRegister>();
    const { registerEventAttendee } = useEventMutation();

    const onSubmit = handleSubmit(async (data: IAttendeeRegister) => {
        try {
            setIsSubmitting(true);
            const formData = new FormData()
            formData.append('eventId', event.id);
            formData.append('eventAddress', event.eventAddress || '');
            formData.append('email', data.email);
            formData.append('address', publicKey || data.wallet || '');

            const response = await registerEventAttendee.mutateAsync(formData)

            if (response?.data?.success) {
                toast({ type: 'success', message: `An invitation was sent to ${data.email}` });
                onClose();
            } else {
                toast({ type: 'error', message: 'Something were wrong registering your user ☹️' });
            }
        } catch (error) {
            toast({ type: 'error', message: 'Something were wrong registering your user ☹️' });
        } finally {
            setIsSubmitting(false);
        }
    });

    return <Modal
        show={open}
        size="md"
        popup={open}
        onClose={onClose}
        className='bg-modalBackground h-screen pt-56 md:pt-0'
    >
        <Modal.Header />
        <Modal.Body>
            <div className="space-y-6 px-6 sm:px-2 sm:pb-6 lg:px-8 xl:pb-8">
                <form>
                    <div className="flex flex-col justify-between">
                        <div className="flex flex-col ">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                For event invitation and reminders
                            </h3>
                            <div className="block mb-1 mt-2">
                                <Label
                                    htmlFor="email"
                                    value="Your kickass email *"
                                />
                            </div>
                            <FormInput<IAttendeeRegister>
                                id="email"
                                type="email"
                                name="email"
                                label="Your email for invitation"
                                placeholder="Email"
                                className="mb-2"
                                register={register}
                                rules={{ required: 'You must enter an email.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid email address" } }}
                                errors={errors}
                            />

                            {
                                _.isEmpty(publicKey) && event.requirePoap ? <>
                                    <div className="block mb-1 mt-3">
                                        <Label htmlFor="email">
                                            This event also provides a <a className="cursor-pointer text-indigo-400" href="https://medium.com/poap/what-is-poap-d7e8fdfc207d" target={'_blank'}>POAP </a> for assistances, if you want to receive one, please put your ethereum address, a link for claim it will be sended to your email after the event (optional)
                                        </Label>
                                    </div>
                                    <FormInput<IAttendeeRegister>
                                        id="wallet"
                                        type="text"
                                        name="wallet"
                                        label="Ethereum address"
                                        placeholder="0x...."
                                        className="mb-2"
                                        register={register}
                                        rules={{ required: false, pattern: { value: /^(0x){1}[0-9a-fA-F]{40}$/i, message: "Invalid ethereum address" } }}
                                        errors={errors}
                                    />
                                </> : <></>
                            }
                        </div>

                        <Button type='submit' className="mt-2" onClick={onSubmit} disabled={isSubmitting}>
                            {
                                isSubmitting ? <Spinner
                                    size="sm"
                                    light={true}
                                /> : 'Send me the invitation!'
                            }
                        </Button>
                    </div>
                </form>

                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    {
                        !user ? <>
                            Do you want to create an account? sure,{' '}
                            <a
                                onClick={() => login()}
                                className="text-blue-700 hover:underline dark:text-blue-500"
                            >
                                Click here
                            </a>
                        </> :
                            <></>
                    }
                </div>
            </div>
        </Modal.Body>
    </Modal>
}