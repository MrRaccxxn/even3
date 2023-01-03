import { Avatar, Dropdown } from "flowbite-react";
import Router from 'next/router';
import { useState } from "react";
import { useWeb3Auth } from "../../contexts/web3AuthContext";

export const UserDropdown = () => {
    const { user, logout, setIsLoading, getPublicKey } = useWeb3Auth();
    const [publicKey, setPublicKey] = useState();

    getPublicKey().then(res => setPublicKey(res))

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await logout();
        } finally {
            setIsLoading(false);
        }
    }

    return <Dropdown
        label={<Avatar img={user?.profileImage} alt="User" rounded={true} status="online" statusPosition="bottom-right" size="sm" />}
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