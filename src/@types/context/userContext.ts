import { Dispatch, SetStateAction } from "react";

export interface UserContextInterface {
    user: {};
    setUser: Dispatch<SetStateAction<{}>>;
}