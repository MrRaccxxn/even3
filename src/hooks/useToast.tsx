import { ToastType } from "../components/Toast";
import { ActionType, useToastDispatchContext } from "../contexts/toastContext";

export function useToast() {
    const dispatch = useToastDispatchContext();
    const TOAST_ALIVE_TIME = 4 * 1000;

    function toast({ type, message }: { type: ToastType, message: string }) {
        const id = Math.random().toString(36).substr(2, 9);
        dispatch({
            type: ActionType.ADD_TOAST,
            toast: {
                id,
                type,
                message
            },
        });

        setTimeout(() => {
            dispatch({ type: ActionType.DELETE_TOAST, id });
        }, TOAST_ALIVE_TIME);
    }

    return toast;
}