import type { AppProps } from 'next/app';
import { UserProvider } from '../src/contexts/userContext';
import { Web3AuthProvider } from '../src/contexts/web3AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {

  return <Web3AuthProvider web3AuthNetwork={'testnet'} chain={'goerli_testnet'}>
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  </Web3AuthProvider>
}

export default MyApp;
