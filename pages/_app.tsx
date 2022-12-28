import type { AppProps } from 'next/app';
import ToastContainer from '../src/components/Toast/ToastContainer';
import { ToastProvider } from '../src/contexts/toastContext';
import { UserProvider } from '../src/contexts/userContext';
import { Web3AuthProvider } from '../src/contexts/web3AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {

  return <Web3AuthProvider web3AuthNetwork={'testnet'} chain={'goerli_testnet'}>
    <UserProvider>
      <ToastProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </ToastProvider>
    </UserProvider>
  </Web3AuthProvider>
}

export default MyApp;
