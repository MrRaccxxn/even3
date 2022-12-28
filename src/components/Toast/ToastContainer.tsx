
import CustomToast from ".";
import { IToast, useToastStateContext } from "../../contexts/toastContext";


export default function ToastContainer() {
    const { toasts } = useToastStateContext();

    return (
        <div className="absolute bottom-10 w-full z-50">
            <div className="mx-auto">
                <div>
                    {toasts &&
                        toasts.map((toast: IToast, index) => <CustomToast id={toast.id} key={index} type={toast.type} message={toast.message} />)
                    }
                </div>
            </div>
        </div>
    );
}