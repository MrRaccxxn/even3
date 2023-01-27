import { Button } from "flowbite-react";
import { useWeb3Auth } from "../../../../contexts/web3AuthContext";
import { UserDropdown } from "../../../UserDropdown";

export const ConnectButton = () => {
    const { login, publicKey, isWeb3AuthInit } = useWeb3Auth();

    const handleLogin = async () => {
        await login();
    }

    if (publicKey) return <UserDropdown />

    return <Button disabled={!isWeb3AuthInit} color="transparent" onClick={handleLogin} className="sm:h-9 text-white font-semibold">
        <h3>Login</h3>
    </Button>

}