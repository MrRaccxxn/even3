import { Footer } from 'flowbite-react';
import type { NextPage } from 'next';
import { Header } from 'src/components/Layout/Header';
import { ContainerX } from '../../src/components/Layout/Container';
import { RegisterEvent } from '../../src/pages/event/RegisterEvent';

const Register: NextPage = () => {
    return (
        <>
            <div className='h-screen flex flex-col w-full'>
                <Header />
                <ContainerX>
                    <RegisterEvent />
                </ContainerX>
            </div>
            <ContainerX><Footer /></ContainerX>
        </>
    );
};

export default Register;
