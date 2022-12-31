import { Button } from "flowbite-react";
import Router from 'next/router';

export const Error = () => {
    return <div className="flex flex-row gap-28 md:flex-col-reverse md:gap-4">
        <div className="self-center">
            <h1 className="my-2 font-bold text-2xl">
                Looks like you've found the
                doorway to the great nothing
            </h1>
            <p className="my-2">Sorry about that! Please visit our hompage to get where you need to go.</p>
            <Button onClick={() => Router.replace('/')}>
                Take me back home!
            </Button>
        </div>

        <div >
            <img src="/assets/img/illustrations/error.png" />
        </div>
    </div>
}