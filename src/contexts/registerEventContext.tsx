import { RegisterEventContextInterface } from '@/types/context/registerEventContext';
import { IEventForm } from '@/types/models/IEvent';
import { createContext, useState } from 'react';

export const RegisterEventContext = createContext<RegisterEventContextInterface | null>(null)

export const RegisterEventProvider = ({ children }: { children: JSX.Element }) => {
    const [eventData, setEventData] = useState<IEventForm>({
        title: '',
        description: '',
        date: '',
        poster: [],
        owner: '',
        location: '',
        badgeImage: '',
        eventLink: ''
    });
    const [requirePoap, setRequirePoap] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);

    return <RegisterEventContext.Provider value={{ requirePoap, setRequirePoap, eventData, setEventData, step, setStep }}>
        {children}
    </RegisterEventContext.Provider>
}