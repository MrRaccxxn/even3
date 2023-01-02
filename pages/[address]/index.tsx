import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ContainerX } from 'src/components/Layout/Container';
import { Footer } from 'src/components/Layout/Footer';
import { Header } from 'src/components/Layout/Header';
import { Loader } from 'src/components/Loader';
import { useWeb3Auth } from 'src/contexts/web3AuthContext';
import { useEvent } from 'src/hooks/models/useEvent';
import { Profile } from '../../src/pages/profile';

const ProfilePage: NextPage = () => {
    const { isLoading } = useWeb3Auth();
    const { isLoading: isFetchingEvents } = useEvent({ filter: {} });
    const router = useRouter();
    const { address } = router.query as any;

    return (
        <div className='h-screen flex flex-col justify-between'>
            <ContainerX>
                <Header />
            </ContainerX>
            {
                isLoading || isFetchingEvents ? <div className="flex justify-center">
                    <Loader />
                </div> :
                    <Profile address={address} />
            }
            <ContainerX><Footer /></ContainerX>

        </div>

    );
};

export default ProfilePage;
