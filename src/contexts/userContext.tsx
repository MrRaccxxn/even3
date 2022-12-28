import { createContext, useState } from 'react';
import { UserContextInterface } from '../@types/context/userContext';

export const UserContext = createContext<UserContextInterface | null>(null)

export const UserProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<{}>({});

    return <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
}