import * as jwt from 'jsonwebtoken';

const decodeToken = () => {
    return jwt.decode(window.sessionStorage.getItem('token') || '')
}

const jwtUtil = {
    getPublicKey: () => {
        try {
            const tokenData = decodeToken() as any;;
            const { public_key } = tokenData.wallets[0]

            return public_key
        } catch (error) {
            return undefined
        }
    },
}

export default jwtUtil
