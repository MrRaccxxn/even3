import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { UserContextProvider } from "../src/context/User.context";
import theme from "../styles/theme";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL!}
      appId={process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID!}
    >
      <ChakraProvider theme={theme}>
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </ChakraProvider>
    </MoralisProvider>
  );
}

export default MyApp;
