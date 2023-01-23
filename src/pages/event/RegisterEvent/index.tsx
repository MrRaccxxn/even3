import { Alert, Spinner } from 'flowbite-react';
import _ from 'lodash';
import Link from 'next/link';
import { useWeb3Auth } from '../../../contexts/web3AuthContext';
import { RegisterEventForm } from './components/RegisterEventForm';

export const RegisterEvent = () => {
  const { user, login, isLoading } = useWeb3Auth()

  const handleLogin = async () => {
    await login();
  }

  if (isLoading) return <Spinner
    aria-label="Loading"
    size="xl"
    className='absolute m-auto top-1/2 left-0 right-0'
  />

  return (
    <div className='container h-full flex justify-center items-center'>
      {
        _.isEmpty(user) ?
          <Alert
            additionalContent={
              <>
                <div className="mt-2 mb-4 text-sm text-blue-700 dark:text-blue-800">
                  In order to create an Event, you must first be logged in to your account. This is a necessary requirement in order to proceed with creating the Event.
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
              Oops! You must be logged to create an Event
            </h3>
          </Alert>

          : <RegisterEventForm />
      }
    </div >
  );
};
