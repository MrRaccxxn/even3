import type { NextPage } from 'next';
import { Container } from '../../src/components/Layout/Container';
import Layout from '../../src/components/Layout/Layout';
import { Error } from '../../src/pages/Error';

const ErrorPage: NextPage = () => {
    return (
        <Layout>
            <Container>
                <Error />
            </Container>
        </Layout>
    );
};

export default ErrorPage;
