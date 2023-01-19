import moment from 'moment';

export const Calendar = ({ date }: { date: string }) => {
    return <div className="rounded-xl h-28 w-32 text-center bg-buttonBackground">
        <div className="bg-yellow h-10 p-1">
            <h3 className='font-semibold'>{moment(date, 'YYYY-MM-DDTHH:mm:ss').format('MMMM')}</h3>
        </div>
        <div className="bg-white p-2 rounded-b-xl">
            <h1 className="text-black">{moment(date, 'YYYY-MM-DDTHH:mm:ss').format("DD")}</h1>
            <p className='scale-90'>{moment(date, 'YYYY-MM-DDTHH:mm:ss').format('dddd')}</p>
        </div>
    </div>
}