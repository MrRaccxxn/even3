import { Avatar, Dropdown } from "flowbite-react"

export const UserDropdown = () => {
    return <Dropdown
        label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true} />}
        arrowIcon={false}
        inline={true}
    >
        <Dropdown.Header>
            <span className="block text-sm">
                Bonnie Green
            </span>
            <span className="block truncate text-sm font-medium">
                name@flowbite.com
            </span>
        </Dropdown.Header>
        <Dropdown.Item>
            Dashboard
        </Dropdown.Item>
        <Dropdown.Item>
            Settings
        </Dropdown.Item>
        <Dropdown.Item>
            Earnings
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
            Sign out
        </Dropdown.Item>
    </Dropdown>
}