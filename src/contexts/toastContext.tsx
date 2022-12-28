import React, { createContext, Dispatch, useContext, useReducer } from "react";
import { ToastType } from "../components/Toast";

const ToastStateContext = createContext({ toasts: [] });
const ToastDispatchContext = createContext<Dispatch<Action>>({} as Dispatch<Action>);

export interface IToast {
    id: string;
    type: ToastType;
    message: string;
}

export enum ActionType {
    ADD_TOAST = 'ADD_TOAST',
    DELETE_TOAST = 'DELETE_TOAST',
}

interface addToast {
    type: ActionType.ADD_TOAST;
    toast: IToast
}

interface deleteToast {
    type: ActionType.DELETE_TOAST;
    id: string;
}

const initialState = {
    toasts: []
}

type Action = addToast | deleteToast

function ToastReducer(state: any, action: Action) {
    switch (action.type) {
        case "ADD_TOAST": {
            return {
                ...state,
                toasts: [...state.toasts, action.toast],
            };
        }
        case "DELETE_TOAST": {
            const updatedToasts = state.toasts.filter((toast: IToast) => toast.id != action.id)
            return {
                ...state,
                toasts: updatedToasts,
            };
        }
        default: {
            throw new Error("unhandled action");
        }
    }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(ToastReducer, initialState);

    return (
        <ToastStateContext.Provider value={state}>
            <ToastDispatchContext.Provider value={dispatch}>
                {children}
            </ToastDispatchContext.Provider>
        </ToastStateContext.Provider>
    );
}

export const useToastStateContext = () => useContext(ToastStateContext);
export const useToastDispatchContext = () => useContext(ToastDispatchContext);