import type { NextPage } from 'next';
import { ContainerX } from 'src/components/Layout/Container';
import { Footer } from 'src/components/Layout/Footer';
import { Header } from 'src/components/Layout/Header';
import { Profile } from '../../src/pages/profile';

const ProfilePage: NextPage = () => {
    return (
        <>
            <ContainerX>
                <Header />
            </ContainerX>
            <Profile />
            <ContainerX><Footer /></ContainerX>

        </>

    );
};

export default ProfilePage;
