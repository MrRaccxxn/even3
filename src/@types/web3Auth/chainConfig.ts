import { CHAIN_NAMESPACES } from "@web3auth/base";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY || ''

export const CHAIN_CONFIG = {
    goerli_arbitrum: {
        displayName: "Arbitrum Testnet",
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x66EED",
        rpcTarget: `https://arb-goerli.g.alchemy.com/v2/${alchemyKey}`,
        blockExplorer: "https://testnet.arbiscan.io/",
        ticker: "AETH",
        tickerName: "AETH",
    },
} as const;

export type CHAIN_CONFIG_TYPE = keyof typeof CHAIN_CONFIG;