import _ from 'lodash';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ContainerX } from 'src/components/Layout/Container';
import { Footer } from 'src/components/Layout/Footer';
import { Header } from 'src/components/Layout/Header';
import { Loader } from 'src/components/Loader';
import { useWeb3Auth } from 'src/contexts/web3AuthContext';
import { useEvent } from 'src/hooks/models/useEvent';
import { EventStatistics } from 'src/pages/event/EventStatistics';

const EventStatisticsPage: NextPage = () => {
    const router = useRouter();
    const { eventId } = router.query as any;
    const { isLoading } = useWeb3Auth();
    const { isLoading: isFetchingEvents, events } = useEvent({ filter: { id: eventId } });
    const event = _.isUndefined(events) ? null : events[0];

    return (
        <>
            <div className='h-screen flex flex-col w-full'>
                <Header />
                {
                    isLoading || isFetchingEvents ?
                        <div className="flex justify-center h-full">
                            <Loader fillScreen={true} />
                        </div> :
                        <EventStatistics event={event} />
                }
                {
                    isFetchingEvents && <ContainerX><Footer /></ContainerX>
                }
            </div>
        </>
    );
};

export default EventStatisticsPage;
