import { Dispatch, SetStateAction } from "react";
import { IEventForm } from "../models/IEvent";

export interface RegisterEventContextInterface {
    requirePoap: boolean;
    setRequirePoap: Dispatch<SetStateAction<boolean>>;
    eventData: IEventForm;
    setEventData: Dispatch<SetStateAction<IEventForm>>;
    step: number,
    setStep: Dispatch<SetStateAction<number>>;
}