import type { LOGIN_PROVIDER_TYPE } from "@toruslabs/openlogin";
import { WALLET_ADAPTER_TYPE } from "@web3auth/base";
import { Web3AuthCore } from "@web3auth/core";
import { IWalletProvider } from "../../core/clients/web3Auth/walletProvider";

export interface IWeb3AuthContext {
    web3Auth: Web3AuthCore | null;
    provider: IWalletProvider | null;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    user: any;
    chain: string;
    isWeb3AuthInit: boolean;
    login: (adapter: WALLET_ADAPTER_TYPE, provider: LOGIN_PROVIDER_TYPE, jwtToken: string) => Promise<void>;
    logout: () => Promise<void>;
    getUserInfo: () => Promise<any>;
    //signMessage: () => Promise<any>;
    getAccounts: () => Promise<any>;
    getBalance: () => Promise<any>;
    // signTransaction: () => Promise<void>;
    // signAndSendTransaction: () => Promise<void>;
}