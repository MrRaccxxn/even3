import React, { Dispatch, SetStateAction, useState } from "react";

interface UserContextInterface {
  account: string;
  balance: number;
  setAccount: Dispatch<SetStateAction<string>>;
  setBalance: Dispatch<SetStateAction<number>>;
}

const UserContext = React.createContext<UserContextInterface>({
  account: "",
  balance: 0,
  setAccount: () => {},
  setBalance: () => {},
});

export function UserContextProvider({ children }: { children: any }) {
  const [account, setAccount] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);

  return (
    <UserContext.Provider value={{ account, balance, setAccount, setBalance }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
