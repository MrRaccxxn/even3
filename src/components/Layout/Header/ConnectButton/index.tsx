import { WALLET_ADAPTERS } from "@web3auth/base";
import _ from "lodash";
import { useRouter } from "next/router";
import { useweb3Auth } from "../../../../contexts/web3AuthContext";
import { ping } from "../../../../services/lib/ping";
import { Loader } from "../../../Loader";

export const ConnectButton = () => {
    const { isLoading, isWeb3AuthInit, user, login, logout, setIsLoading } = useweb3Auth();
    const router = useRouter();
    const { jwt } = router.query
    const token = jwt == null ? "" : jwt as string;

    if (isLoading || !isWeb3AuthInit) return <div><Loader /></div>

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            await login(WALLET_ADAPTERS.OPENLOGIN, "jwt", token);
        } finally {
            setIsLoading(false);
        }
    }

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await logout();
        } finally {
            setIsLoading(false);
        }
    }

    if (user && !_.isEmpty(user)) return <>
        <button onClick={handleLogout}>
            <p className="text-white">Log Out</p>
        </button>
        <button onClick={ping}>Click me</button>
    </>

    return <button onClick={handleLogin}>
        <p className="text-white">Log In</p>
    </button>
}