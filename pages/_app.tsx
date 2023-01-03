import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import ToastContainer from '../src/components/Toast/ToastContainer';
import { ToastProvider } from '../src/contexts/toastContext';
import { UserProvider } from '../src/contexts/userContext';
import { Web3AuthProvider } from '../src/contexts/web3AuthContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  const env = process.env.NEXT_PUBLIC_ENV || 'dev'

  return <Web3AuthProvider web3AuthNetwork={env === 'dev' ? 'testnet' : 'cyan'} chain={env === 'dev' ? 'goerli_testnet' : 'mainnet'}>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ToastProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </ToastProvider>
      </UserProvider>
    </QueryClientProvider>
  </Web3AuthProvider>
}

export default MyApp;
