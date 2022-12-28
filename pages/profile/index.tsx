import type { NextPage } from 'next';
import { Container } from '../../src/components/Layout/Container';
import Layout from '../../src/components/Layout/Layout';
import { Profile } from '../../src/pages/profile';

const ProfilePage: NextPage = () => {
    return (
        <Layout>
            <Container>
                <Profile />
            </Container>
        </Layout>
    );
};

export default ProfilePage;
