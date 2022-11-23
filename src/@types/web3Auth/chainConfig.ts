import { CHAIN_NAMESPACES, CustomChainConfig } from "@web3auth/base";

export const CHAIN_CONFIG = {
    goerli_optimism: {
        displayName: "Optimism Goerli Testnet",
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x1A4",
        rpcTarget: "https://opt-goerli.g.alchemy.com/v2/demo",
        blockExplorer: "https://goerli.etherscan.io",
        ticker: "ETH",
        tickerName: "Ethereum",
    },
    mainnet: {
        displayName: "Ethereum Mainnet",
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x1",
        rpcTarget: `https://mainnet.infura.io/v3/776218ac4734478c90191dde8cae483c`,
        blockExplorer: "https://etherscan.io/",
        ticker: "ETH",
        tickerName: "Ethereum",
    } as CustomChainConfig,
    polygon: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        rpcTarget: "https://polygon-rpc.com",
        blockExplorer: "https://polygonscan.com/",
        chainId: "0x89",
        displayName: "Polygon Mainnet",
        ticker: "matic",
        tickerName: "Matic",
    } as CustomChainConfig,
} as const;

export type CHAIN_CONFIG_TYPE = keyof typeof CHAIN_CONFIG;