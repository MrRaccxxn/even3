import type { OpenloginUserInfo } from "@toruslabs/openlogin";
import {
    ADAPTER_EVENTS, LoginMethodConfig, SafeEventEmitterProvider, WALLET_ADAPTERS
} from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { createContext, FunctionComponent, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { IWeb3AuthContext } from "../@types/context/web3AuthContext";
import { CHAIN_CONFIG, CHAIN_CONFIG_TYPE } from "../@types/web3Auth/chainConfig";
import { WEB3AUTH_NETWORK_TYPE } from "../@types/web3Auth/web3AuthNetwork";
import { getWalletProvider, IWalletProvider } from "../core/clients/web3Auth/walletProvider";

const web3AuthClientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || '';

export const web3AuthContext = createContext<IWeb3AuthContext>({
    web3Auth: null,
    provider: null,
    isLoading: false,
    user: {},
    chain: "",
    isWeb3AuthInit: false,
    setIsLoading: (loading: boolean) => { },
    login: async () => { },
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
    const [web3Auth, setweb3Auth] = useState<Web3Auth | null>(null);
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
        const subscribeAuthEvents = async (web3Auth: Web3Auth) => {
            web3Auth.on(ADAPTER_EVENTS.CONNECTED, async () => {
                const user = await web3Auth.getUserInfo()
                setUser(user);
                setWalletProvider(web3Auth.provider!);
            });

            web3Auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
                setUser({});
            });

            web3Auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
                console.log(error);
            });
        };

        const currentChainConfig = CHAIN_CONFIG[chain];

        async function init() {
            try {
                setIsLoading(true);
                const web3AuthInstance = new Web3Auth({
                    chainConfig: currentChainConfig,
                    clientId: web3AuthClientId,
                });
                subscribeAuthEvents(web3AuthInstance);

                const openloginAdapter = new OpenloginAdapter({
                    adapterSettings: {
                        uxMode: "redirect",
                        whiteLabel: {
                            name: "Even3",
                            logoLight: "https://raccoon-s3.s3.eu-central-1.amazonaws.com/even3-logo.png",
                            logoDark: "https://raccoon-s3.s3.eu-central-1.amazonaws.com/even3-logo.png",
                            defaultLanguage: "en",
                            dark: true, // whether to enable dark mode. defaultValue: false
                        },
                    },
                });
                web3AuthInstance.configureAdapter(openloginAdapter);

                // const torusWalletAdapter = new TorusWalletAdapter({
                //     adapterSettings: {
                //         buttonPosition: "bottom-left",
                //     },
                //     loginSettings: {
                //         verifier: "google",
                //     },
                //     initParams: {
                //         buildEnv: "testing",
                //     },
                //     clientId: web3AuthClientId,
                //     sessionTime: 3600, // 1 hour in seconds
                // });

                // web3AuthInstance.configureAdapter(torusWalletAdapter);
                await web3AuthInstance.initModal({
                    modalConfig: {
                        [WALLET_ADAPTERS.OPENLOGIN]: {
                            label: 'openlogin',
                            // setting it to false will hide all social login methods from modal.
                            showOnModal: false,
                        }
                    }
                });
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

    const login = async () => {
        try {
            setIsLoading(true);
            if (!web3Auth) {
                console.log("web3auth not initialized yet");
                return;
            }

            const localProvider = await web3Auth.connect();

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

        const publicKey: any = await web3Auth.provider?.request({
            method: "eth_accounts",
        });

        //const appPubKey = getPublicCompressed(Buffer?.from(appScopedPrivKey?.padStart(64, "0"), "hex") || '').toString("hex");

        return publicKey[0] || '';
    }

    const getLoginMethodsConfig = () => {
        const loginMethods = [
            'google',
            'facebook',
            'twitter',
            'reddit',
            'discord',
            'twitch',
            'apple',
            'line',
            'github',
            'kakao',
            'linkedin',
            'weibo',
            'wechat',
            'email_passwordless'
        ] as const

        const disabledLoginMethodsParam: LoginMethodConfig = {};
        loginMethods.forEach(method => disabledLoginMethodsParam[method] = { name: `${method} login`, showOnModal: false })

        return disabledLoginMethodsParam
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