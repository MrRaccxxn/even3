import type { NextPage } from 'next';
import MetaData from 'pages/_seo';
import { Header } from 'src/components/Layout/Header';
import { PoapSearcher } from 'src/pages/PoapSearcher';

const ProfilePage: NextPage = () => {
    return (
        <>
            <MetaData siteTitle={'Profile'} />
            <div className='flex flex-col justify-between h-screen w-full'>
                <Header />
                {
                    <PoapSearcher />
                }
            </div>
        </>
    );
};

export default ProfilePage;

