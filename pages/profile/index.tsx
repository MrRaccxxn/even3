import type { NextPage } from 'next';
import { ContainerX } from 'src/components/Layout/Container';
import { Footer } from 'src/components/Layout/Footer';
import { Header } from 'src/components/Layout/Header';
import { Profile } from '../../src/pages/profile';

const ProfilePage: NextPage = () => {
    return (
        <div className='h-screen flex flex-col justify-between'>
            <ContainerX>
                <Header />
            </ContainerX>
            <Profile />
            <ContainerX><Footer /></ContainerX>

        </div>

    );
};

export default ProfilePage;
