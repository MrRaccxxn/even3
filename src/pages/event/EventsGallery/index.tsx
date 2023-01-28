import { Badge, Spinner } from "flowbite-react";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import { useEvent } from "src/hooks/models/useEvent";
import { UpcomingEvents } from "src/pages/HomePage/components/UpcomingEvents";

export const EventsGallery = () => {
    const [inputText, setInputText] = useState<string>('');
    const { events, isLoading, refetch } = useEvent({ filter: { title: inputText === '' ? undefined : inputText }, limit: 12, useRegex: true });

    const reFetchEvents = async (filter: any) => {
        setInputText(filter)
        await refetch()
    }

    const handler = useCallback(debounce((reFetchEvents), 300), []);

    const onSubmit = async (event: any) => {
        handler(event.target.value);
    };

    return <div className="mt-32 sm:mt-16">
        <div className="mb-3 w-3/6 sm:w-full m-auto pb-12 sm:pb-0">
            <h2 className="text-center py-5">Find Fresh Experiences 🎟️</h2>
            <div className="input-group relative flex w-full mb-4 gap-2">

                <input
                    type="text"
                    className="self-center bg-transparent form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-300 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-200  focus:border-blue-600 focus:outline-none" placeholder="Search..." aria-label="Search" aria-describedby="button-addon2"
                    onChange={onSubmit}
                />
            </div>
            <div className="flex flex-row gap-2">
                <p>
                    Searching by :
                </p>
                <Badge
                    color="warning"
                    size="sm"
                    className="w-fit"
                >
                    Title
                </Badge>
            </div>
        </div>
        {
            isLoading ? <div className='w-full text-center'><Spinner /></div> : <UpcomingEvents events={events || []} />
        }
    </div>
}