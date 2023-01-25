import { IEvent } from "@/types/models/IEvent"
import { Button } from "flowbite-react"
import { useState } from "react"
import { useWeb3Auth } from "src/contexts/web3AuthContext"
import { RegisterAttendeeModal } from "./RegisterAttendeeForm"

export const RegisterAttendee = ({ event }: { event: IEvent }) => {
    const { user, publicKey } = useWeb3Auth()
    const [openModal, setOpenModal] = useState<boolean>(false)

    const handleRegister = async () => {
        if (user.email) {
            // const formData = new FormData()
            // formData.append('eventId', event.id);
            // formData.append('eventAddress', event.eventAddress || '');
            // formData.append('email', user.email);
            // formData.append('address', publicKey);
            // const response = registerAttendee(formData)
            // console.log(response)
        } else {
            setOpenModal(true)
        }
    }

    return <>
        <RegisterAttendeeModal open={openModal} onClose={() => setOpenModal(false)} event={event} />
        <Button size={'lg'} onClick={handleRegister} style={{ cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>✨</text></svg>")  16 0,  auto` }}>Register</Button>
    </>
}