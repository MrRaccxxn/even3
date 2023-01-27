import { RegisterEventContextInterface } from "@/types/context/registerEventContext"
import { IEventForm } from "@/types/models/IEvent"
import { ErrorMessage } from "@hookform/error-message"
import { Label } from "flowbite-react"
import moment from "moment"
import { useContext } from "react"
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form"
import { DragAndDrop } from "src/components/form/DragAndDrop"
import { FormInput } from "src/components/form/FormInput"
import { RegisterEventContext } from "src/contexts/registerEventContext"

export const BasicInfoForm = ({ register, errors, onSubmit, isSubmitting }: { register: UseFormRegister<IEventForm>, errors: Partial<FieldErrorsImpl<IEventForm>>, onSubmit: () => void, isSubmitting: boolean }) => {
    const { requirePoap, setRequirePoap, eventData, setEventData } = useContext(RegisterEventContext) as RegisterEventContextInterface

    const handleCheckbox = (e: any) => {
        setRequirePoap(e.target.checked)
    }

    return (<>
        <div className="w-3/4 sm:w-full flex flex-col justify-between self-center">
            <h2 className="pb-8">Basic event Information ✨</h2>
            <div className="flex flex-col gap-3 mb-4 w-full">
                <div>
                    <div className="block text-gray-400">
                        <Label
                            htmlFor="email"
                            value="Event Title *"
                            className="text-lg"
                            color={'white'}
                        />
                    </div>
                    <FormInput<IEventForm>
                        id="title"
                        type="text"
                        name="title"
                        label="Title *"
                        placeholder="Title"
                        className="mb-2 w-full text-gray-300 text-3xl appearance-none bg-transparent border-none focus:outline-none"
                        register={register}
                        rules={{ required: 'You must enter a title.' }}
                        errors={errors}
                    />
                </div>

                <div className=" pb-2">
                    <div className="block text-gray-400 py-2">
                        <Label
                            htmlFor="email"
                            value="Horizontal poster image of the event *"
                            className="text-lg"
                            color={'white'}
                        />
                    </div>
                    <DragAndDrop memoryImage={eventData.poster} register={register} inputName={'poster'} className={""} label={'poster'} />
                </div>

                <div>
                    <div className="block text-gray-400">
                        <Label
                            htmlFor="description"
                            value="What is the event about *"
                            className="text-lg"
                            color={'white'}
                        />
                    </div>
                    <textarea
                        id="description"
                        placeholder="Description"
                        className="w-full text-gray-300 text-lg appearance-none bg-transparent border-none focus:outline-none"
                        rows={3}
                        {...(register && register('description', { required: 'You must enter a description.' }))}
                    />
                    <ErrorMessage
                        errors={errors}
                        name={'description' as any}
                        render={({ message }: { message: string }) => (
                            <p className="mt-1 text-sm text-left block text-red-500">
                                {message}
                            </p>
                        )}
                    />
                </div>

                <div>
                    <div className="block text-gray-400">
                        <Label
                            htmlFor="email"
                            value="Date and time*"
                            className="text-lg"
                            color={'white'}
                        />
                    </div>
                    <FormInput<IEventForm>
                        id="date"
                        type="datetime-local"
                        name="date"
                        label="Date"
                        min={moment().format('YYYY-MM-DDThh:mm')}
                        className="mb-2 text-gray-300 appearance-none bg-transparent border-none focus:outline-none"
                        register={register}
                        rules={{ required: 'You must enter a date.' }}
                        errors={errors}
                        placeholder={""}
                    />
                </div>

                <div>
                    <div className="block text-gray-400">
                        <Label
                            htmlFor="email"
                            value="Event link *"
                            className="text-lg"
                            color={'white'}
                        />
                    </div>
                    <FormInput<IEventForm>
                        id="eventLink"
                        type="text"
                        name="eventLink"
                        label="Event Link"
                        placeholder="Google meets, Zoom, etc"
                        className="mb-2 text-gray-300  appearance-none bg-transparent border-none focus:outline-none"
                        register={register}
                        rules={{ required: 'You must enter a link.' }}
                        errors={errors}
                    />
                </div>
                <div className="flex flex-row">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" checked={requirePoap} className="sr-only peer" onChange={e => handleCheckbox(e)} />
                        <div className="self-baseline w-11 h-6 bg-gray-400 peer-focus:outline-none  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-gray-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-500"></div>
                    </label>
                    <div className="block text-gray-400  ml-4">
                        <Label
                            htmlFor="email"
                            value="Require POAPs?"
                            className="text-lg"
                            color={'white'}
                        />
                    </div>
                </div>
            </div>

        </div>
    </>);
}