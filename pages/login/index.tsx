import type { NextPage } from 'next';
import { Login } from '../../src/components/Login';

const LoginPage: NextPage = () => {
    return (
        <Login open={true} onClose={() => { }} />
    );
};

export default LoginPage;
