import { Alert } from "flowbite-react"

export const Profile = () => {
    return <div className='w-max-md'>
        <Alert
            color="warning"
            rounded={false}
            className='w-max'
        >
            <span>
                <span className="font-medium">
                    Hi explorer!
                </span>
                {' '}We're sorry :(, but it seems that this content is still stuck in traffic. Please check back later when it arrives at its destination.
            </span>
        </Alert>
    </div>
}