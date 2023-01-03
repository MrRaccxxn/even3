import { Button } from "flowbite-react";
import _ from "lodash";
import { useWeb3Auth } from "../../../../contexts/web3AuthContext";
import { UserDropdown } from "../../../UserDropdown";

export const ConnectButton = () => {
    const { user, login } = useWeb3Auth();

    const handleLogin = async () => {
        await login();
    }

    if (user && !_.isEmpty(user)) return <UserDropdown />

    return <Button onClick={handleLogin} className="sm:h-9">
        Log In
    </Button>

}