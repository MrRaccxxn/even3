import { Alert } from 'flowbite-react';
import _ from 'lodash';
import Link from 'next/link';
import { Loader } from 'src/components/Loader';
import { RegisterEventProvider } from 'src/contexts/registerEventContext';
import { useWeb3Auth } from '../../../contexts/web3AuthContext';
import { RegisterEventForm } from './components/RegisterEventForm';

export const RegisterEvent = () => {
  const { user, login, publicKey, isWeb3AuthInit } = useWeb3Auth()

  const handleLogin = async () => {
    await login();
  }

  if (!isWeb3AuthInit) return <div className='flex flex-col justify-between h-screen'>
    <Loader
      fillScreen={true}
    />
  </div>

  return (
    <RegisterEventProvider>
      <div className='container flex justify-center items-center h-full'>
        {
          _.isEmpty(user) && _.isEmpty(publicKey) ?
            <Alert
              className='max-w-md mt-80'
              additionalContent={
                <>
                  <div className="mt-2 mb-4 text-sm text-blue-700 dark:text-blue-800">
                    Account registration is neccesary just for the event hoster, this is to specify the data that will be showed in the event about the organizers
                  </div>
                  <div className="flex">
                    <button onClick={handleLogin} type="button" className="mr-2 inline-flex items-center rounded-lg bg-blue-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-800 dark:hover:bg-blue-900">
                      Login
                    </button>
                    <Link href={'/'}>
                      <button type="button" className="rounded-lg border border-blue-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:ring-4 focus:ring-blue-300 dark:border-blue-800 dark:text-blue-800 dark:hover:text-white">
                        Go Home
                      </button>
                    </Link>
                  </div>
                </>
              }
            >
              <h3 className="text-lg font-medium text-blue-700 dark:text-blue-800">
                Oops! You need an account to create an Event.
              </h3>
            </Alert>

            : <RegisterEventForm />
        }
      </div >
    </RegisterEventProvider>
  );
};
