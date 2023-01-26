import { RegisterEventContextInterface } from '@/types/context/registerEventContext';
import { createContext, useState } from 'react';

export const RegisterEventContext = createContext<RegisterEventContextInterface | null>(null)

export const UserProvider = ({ children }: { children: JSX.Element }) => {
    const [registerEventForm, setUser] = useState<{}>({});

    return <RegisterEventContext.Provider value={{ registerEventForm, setUser }}>
        {children}
    </RegisterEventContext.Provider>
}