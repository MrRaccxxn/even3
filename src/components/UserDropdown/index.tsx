import { Avatar, Dropdown } from "flowbite-react";
import Router from 'next/router';
import jwtUtil from "src/core/jwt";
import { useWeb3Auth } from "../../contexts/web3AuthContext";

export const UserDropdown = () => {
    const { user, logout, setIsLoading } = useWeb3Auth();
    const publicKey = jwtUtil.getPublicKey();

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await logout();
        } finally {
            setIsLoading(false);
        }
    }

    return <Dropdown
        label={<Avatar alt="User" rounded={true} status="online" statusPosition="bottom-right" size="sm" />}
        arrowIcon={false}
        inline={true}
    >
        <Dropdown.Header>
            <span className="block truncate text-sm font-medium">
                {user?.email ? user.email : ''}
            </span>
        </Dropdown.Header>
        <Dropdown.Item onClick={() => { Router.replace('/') }}>
            Home
        </Dropdown.Item>
        <Dropdown.Item onClick={() => { Router.replace(`/${publicKey}`) }}>
            Profile
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout}>
            Sign out
        </Dropdown.Item>
    </Dropdown>
}