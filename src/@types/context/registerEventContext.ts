import { Dispatch, SetStateAction } from "react";

export interface RegisterEventContextInterface {
    registerEventForm: {};
    setUser: Dispatch<SetStateAction<{}>>;
}