import { RegisterEventContextInterface } from "@/types/context/registerEventContext"
import { IEventForm } from "@/types/models/IEvent"
import { useContext } from "react"
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form"
import { DragAndDrop } from "src/components/form/DragAndDrop"
import { RegisterEventContext } from "src/contexts/registerEventContext"

export const PoapDataForm = ({ register, errors, onSubmit, isSubmitting }: { register: UseFormRegister<IEventForm>, errors: Partial<FieldErrorsImpl<IEventForm>>, onSubmit: () => void, isSubmitting: boolean }) => {
    const { requirePoap, setRequirePoap, eventData, setEventData } = useContext(RegisterEventContext) as RegisterEventContextInterface

    const handleCheckbox = (e: any) => {
        setRequirePoap(e.target.checked)
    }

    return (<div className="w-3/4 sm:w-full flex flex-col justify-between self-center">
        <h2 className="pb-8">Your poap information ✨</h2>
        <div className="w-2/5 sm:w-full self-center py-4 text-center">
            <DragAndDrop register={register} inputName={'poster'} className={""} label={'poap poster'} maxMb={4} square={true} />
        </div>
    </div>);
}