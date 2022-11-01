import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import type { AppProps } from 'next/app';
import '../styles/globals.css';

const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }: AppProps) {
  return <ThirdwebProvider
    desiredChainId={activeChainId}
    authConfig={{
      // Set this to your domain to prevent signature malleability attacks.
      domain: process.env.NEXT_PUBLIC_BASE_URL || 'localhost:3000',
      authUrl: "/api/auth",
      loginRedirect: "/",
    }}
  >
    <Component {...pageProps} />
  </ThirdwebProvider>;
}

export default MyApp;
