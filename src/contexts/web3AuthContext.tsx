import { getPublicCompressed } from "@toruslabs/eccrypto";
import type { LOGIN_PROVIDER_TYPE, OpenloginUserInfo } from "@toruslabs/openlogin";
import {
    ADAPTER_EVENTS, SafeEventEmitterProvider, WALLET_ADAPTER_TYPE
} from "@web3auth/base";
import { Web3AuthCore } from "@web3auth/core";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { createContext, FunctionComponent, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { IWeb3AuthContext } from "../@types/context/web3AuthContext";
import { CHAIN_CONFIG, CHAIN_CONFIG_TYPE } from "../@types/web3Auth/chainConfig";
import { WEB3AUTH_NETWORK_TYPE } from "../@types/web3Auth/web3AuthNetwork";
import { getWalletProvider, IWalletProvider } from "../core/clients/web3Auth/walletProvider";
import axiosClient from "../services/axiosClient";
const web3AuthClientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || '';

export const web3AuthContext = createContext<IWeb3AuthContext>({
    web3Auth: null,
    provider: null,
    isLoading: false,
    user: {},
    chain: "",
    isWeb3AuthInit: false,
    setIsLoading: (loading: boolean) => { },
    login: async (adapter: WALLET_ADAPTER_TYPE, provider: LOGIN_PROVIDER_TYPE, jwtToken: string) => { },
    logout: async () => { },
    getUserInfo: async () => { },
    //signMessage: async () => { },
    getAccounts: async () => { },
    getBalance: async () => { },
    getPublicKey: async () => { },
    //signTransaction: async () => { },
    //signAndSendTransaction: async () => { },
})

export function useWeb3Auth(): IWeb3AuthContext {
    return useContext(web3AuthContext);
}

interface Iweb3AuthState {
    web3AuthNetwork: WEB3AUTH_NETWORK_TYPE;
    chain: CHAIN_CONFIG_TYPE;
    children?: React.ReactNode
}
interface Iweb3AuthProps {
    web3AuthNetwork: WEB3AUTH_NETWORK_TYPE;
    chain: CHAIN_CONFIG_TYPE;
    children?: ReactNode;
}

export const Web3AuthProvider: FunctionComponent<Iweb3AuthState> = ({ children, web3AuthNetwork, chain }: Iweb3AuthProps) => {
    const [web3Auth, setweb3Auth] = useState<Web3AuthCore | null>(null);
    const [provider, setProvider] = useState<IWalletProvider | null>(null);
    const [user, setUser] = useState<Partial<OpenloginUserInfo> | {}>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isWeb3AuthInit, setWeb3Authinit] = useState(false);
    const setWalletProvider = useCallback(
        (web3AuthProvider: SafeEventEmitterProvider) => {
            const walletProvider = getWalletProvider(web3AuthProvider);
            setTimeout(
                function () {
                    setProvider(walletProvider);
                },
                1000
            );
        },
        [chain]
    );

    useEffect(() => {
        const subscribeAuthEvents = async (web3Auth: Web3AuthCore) => {
            web3Auth.on(ADAPTER_EVENTS.CONNECTED, async (data: unknown) => {
                const user = await web3Auth.getUserInfo()
                await sessionStorage.setItem('token', user.idToken || '')
                setUser(user);
                axiosClient.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
                const publicKey = getPublicKey()
                axiosClient.defaults.headers.common['PublicKey'] = `${publicKey}`
                setWalletProvider(web3Auth.provider!);
            });
            web3Auth.on(ADAPTER_EVENTS.CONNECTING, () => {
                console.log("connecting to web3 auth");
            });

            web3Auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
                setUser({});
            });

            web3Auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
                console.error("some error or user has cancelled login request", error);
            });
        };

        const currentChainConfig = CHAIN_CONFIG[chain];

        async function init() {
            try {
                setIsLoading(true);
                const web3AuthInstance = new Web3AuthCore({
                    chainConfig: currentChainConfig,
                    clientId: web3AuthClientId,
                });
                subscribeAuthEvents(web3AuthInstance);
                const adapter = new OpenloginAdapter({
                    adapterSettings: {
                        network: web3AuthNetwork,
                        uxMode: "popup",
                        loginConfig: {
                            jwt: {
                                name: "JWT Auth0 Login",
                                verifier: "even3-verifier",
                                typeOfLogin: "jwt",
                                clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '',
                            },
                        },
                        redirectUrl: process.env.NEXT_PUBLIC_BASE_URL
                    }, loginSettings: {
                        sessionTime: 7200 //2 hours
                    }
                });
                web3AuthInstance.configureAdapter(adapter);
                await web3AuthInstance.init();
                setweb3Auth(web3AuthInstance);
                setWeb3Authinit(true);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        init();
    }, [chain, web3AuthNetwork, setWalletProvider]);

    const login = async (adapter: WALLET_ADAPTER_TYPE, loginProvider: LOGIN_PROVIDER_TYPE, jwt_token: string) => {
        try {
            setIsLoading(true);
            if (!web3Auth) {
                console.log("web3auth not initialized yet");
                return;
            }

            const localProvider = await web3Auth.connectTo(adapter, {
                loginProvider,
                extraLoginOptions: {
                    id_token: jwt_token,
                    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '',
                    verifierIdField: "sub",
                },
            });

            setWalletProvider(localProvider!);
        } catch (error) {
            console.log("error", error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        if (!web3Auth) {
            return;
        }

        await web3Auth.logout();
        setProvider(null);
        window.sessionStorage.clear();
        window.location.href = "/";
    };

    const getUserInfo = async () => {
        if (!web3Auth) {
            return;
        }
        const user = await web3Auth.getUserInfo();
        return user;
    };

    const getAccounts = async () => {
        if (!provider) {
            console.log("provider not initialized yet");
            return;
        }
        await provider.getAccounts();
    };

    const getBalance = async () => {
        if (!provider) {
            return;
        }

        await provider.getBalance();
    };

    const getPublicKey = async () => {
        if (!web3Auth) {
            console.log("web3Auth not initialized yet");
            return;
        }

        const appScopedPrivKey: any = await web3Auth.provider?.request({
            method: "eth_private_key",
        });

        const appPubKey = getPublicCompressed(Buffer?.from(appScopedPrivKey?.padStart(64, "0"), "hex") || '').toString("hex");

        return appPubKey;
    }

    return <web3AuthContext.Provider value={{
        web3Auth,
        chain,
        provider,
        user,
        isLoading,
        isWeb3AuthInit,
        setIsLoading,
        login,
        logout,
        getUserInfo,
        getAccounts,
        getBalance,
        getPublicKey
        // signMessage,
        // signTransaction,
        // signAndSendTransaction,
    }}>
        {children}
    </web3AuthContext.Provider>
}