import _ from 'lodash';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import MetaData from 'pages/_seo';
import { ContainerX } from 'src/components/Layout/Container';
import { Footer } from 'src/components/Layout/Footer';
import { Header } from 'src/components/Layout/Header';
import { Loader } from 'src/components/Loader';
import { useWeb3Auth } from 'src/contexts/web3AuthContext';
import { useEvent } from 'src/hooks/models/useEvent';
import { EventDetail } from 'src/pages/event/EventDetail';

const ProfilePage: NextPage = () => {
    const router = useRouter();
    const { eventId } = router.query as any;
    const { isLoading } = useWeb3Auth();
    const { isLoading: isFetchingEvents, events } = useEvent({ filter: { id: eventId } });
    const event = _.isUndefined(events) ? null : events[0];

    return (
        <>
            <MetaData title={event?.title} description={event?.description} />
            <div className='h-screen flex flex-col w-full'>
                <Header />
                {
                    isLoading || isFetchingEvents ?
                        <div className="flex justify-center h-full">
                            <Loader fillScreen={true} />
                        </div> :
                        <EventDetail event={event} />
                }
                <ContainerX><Footer /></ContainerX>
            </div>
        </>
    );
};

export default ProfilePage;
