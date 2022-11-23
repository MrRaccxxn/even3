export const WEB3AUTH_NETWORK = {
    cyan: {
        displayName: 'cyan',
    },
    testnet: {
        displayName: 'testnet',
    },
    mainnet: {
        displayName: 'mainnet',
    }
} as const;

export type WEB3AUTH_NETWORK_TYPE = keyof typeof WEB3AUTH_NETWORK;