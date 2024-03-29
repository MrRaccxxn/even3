import _ from 'lodash';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import MetaData from 'pages/_seo';
import { useEffect } from 'react';
import { ContainerX } from 'src/components/Layout/Container';
import { Footer } from 'src/components/Layout/Footer';
import { Header } from 'src/components/Layout/Header';
import { Loader } from 'src/components/Loader';
import { useWeb3Auth } from 'src/contexts/web3AuthContext';
import { useEvent } from 'src/hooks/models/useEvent';
import { EventDetail } from 'src/pages/event/EventDetail';

const EventDetailPage: NextPage = () => {
    const router = useRouter();
    const { eventId } = router.query as any;
    const { isLoading } = useWeb3Auth();
    const { isLoading: isFetchingEvents, events, refetch } = useEvent({ filter: { id: eventId }, limit: 1 });
    const event = _.isUndefined(events) ? null : events[0];

    useEffect(() => {
        if (!eventId) {
            return;
        }
        const fetchSomethingById = async () => {
            refetch()
        }
        fetchSomethingById()

    }, [eventId])

    return (
        <>
            <MetaData siteTitle={event?.title} image={event?.poster} title={event?.title} description={event?.description} url={`${process.env.NEXT_PUBLIC_BASE_URL}${router.asPath}`} />
            <div className='h-screen flex flex-col w-full'>
                <Header />
                {
                    isLoading || isFetchingEvents ?
                        <div className="flex justify-center h-full">
                            <Loader fillScreen={true} />
                        </div> :
                        <EventDetail event={event} />
                }
                {
                    isFetchingEvents && <ContainerX><Footer /></ContainerX>
                }
            </div>
        </>
    );
};

export default EventDetailPage;
