import { useState } from "react"
import { Modal } from "../Modal"
import { LoginForm } from "./LoginForm"

export const LoginModal = () => {
    const [showModal, setShowModal] = useState<boolean>(false)

    return <>
        <button onClick={() => setShowModal(prev => !prev)}>
            Connect
        </button>

        <Modal title={'Sign in'} showModal={showModal} setShowModal={setShowModal}>
            <LoginForm />
        </Modal>
    </>
}