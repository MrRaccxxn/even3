import { Button } from "flowbite-react";
import _ from "lodash";
import { useWeb3Auth } from "../../../../contexts/web3AuthContext";
import { UserDropdown } from "../../../UserDropdown";

export const ConnectButton = () => {
    const { user, login, isLoading } = useWeb3Auth();

    const handleLogin = async () => {
        await login();
    }

    if (user && !_.isEmpty(user)) return <UserDropdown />

    return <Button color="transparent" onClick={handleLogin} className="sm:h-9 text-white font-semibold" disabled={isLoading}>
        <h3>Login</h3>
    </Button>

}