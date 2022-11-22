interface ModalProps {
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    children: React.ReactNode,
    title: string,
}

export const Modal: React.FC<ModalProps> = ({ showModal, setShowModal, title, children }) => {
    if (!showModal) return <></>

    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="bg-modalBackground relative w-auto my-6 mx-auto max-w-3xl p-6 rounded-xl">
                            {/*content*/}
                            <div>
                                {children}
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}