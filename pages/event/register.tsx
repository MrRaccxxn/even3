import type { NextPage } from 'next';
import { Container } from '../../src/components/Layout/Container';
import Layout from '../../src/components/Layout/Layout';
import { RegisterEvent } from '../../src/pages/event/RegisterEvent';

const Register: NextPage = () => {
    return (
        <Layout>
            <Container>
                <RegisterEvent />
            </Container>
        </Layout>
    );
};

export default Register;
