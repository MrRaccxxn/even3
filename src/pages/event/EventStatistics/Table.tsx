import { Button } from "flowbite-react";
import _ from "lodash";
import { useState } from "react";
import { ShareEventModal } from "../EventDetail/components/ShareEventModal";

export const Table = ({ attendeesList, eventTitle }: { attendeesList: Array<{}>, eventTitle: string }) => {
    const [openShareModal, setOpenShareModal] = useState<boolean>(false);

    return <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <h2 className="py-3">Attendees</h2>

                    <table className="min-w-full text-center">
                        <thead className="border-b bg-gray-800">
                            <tr>
                                <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                    #
                                </th>
                                <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                    Email
                                </th>
                                <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                    Wallet Address
                                </th>
                                <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                attendeesList.map((attendee: any, index) => {
                                    return <tr className="bg-transparent border-b" key={index + 1}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{index + 1}</td>
                                        <td className="text-sm text-gray-300 font-light px-6 py-4 whitespace-nowrap">
                                            {attendee?.email || ''}
                                        </td>
                                        <td className="text-sm text-gray-300 font-light px-6 py-4 whitespace-nowrap">
                                            {attendee?.addrees || 'No address submited'}
                                        </td>
                                        <td className="text-sm text-gray-300 font-light px-6 py-4 whitespace-nowrap">
                                            {'Verified'}
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    {
                        _.isEmpty(attendeesList) ? <div className="flex flex-col items-center">
                            <p className="p-4 px-6">It seems like no one registered yet, don't worry! Share the event!</p>
                            <Button onClick={() => setOpenShareModal(true)} className="w-fit">Share Event</Button>
                        </div> : <></>
                    }
                    <ShareEventModal open={openShareModal} onClose={() => setOpenShareModal(false)} eventTitle={eventTitle} />
                </div>
            </div>
        </div>
    </div >
}