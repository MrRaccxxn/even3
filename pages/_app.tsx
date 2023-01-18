import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ToastContainer from '../src/components/Toast/ToastContainer';
import { ToastProvider } from '../src/contexts/toastContext';
import { UserProvider } from '../src/contexts/userContext';
import { Web3AuthProvider } from '../src/contexts/web3AuthContext';
import * as ga from '../src/utils/google/analytics';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])


  return <Web3AuthProvider web3AuthNetwork={'testnet'} chain={'goerli_arbitrum'}>
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
