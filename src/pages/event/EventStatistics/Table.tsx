export const Table = ({ attendeesList }: { attendeesList: Array<{}> }) => {
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
                </div>
            </div>
        </div>
    </div>
}