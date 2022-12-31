import { useContext, useEffect, useState } from "react"
import { IWeb3AuthContext } from "../../../../@types/context/web3AuthContext"
import { web3AuthContext } from "../../../../contexts/web3AuthContext"

export const UserInfo = () => {
    const { getUserInfo } = useContext(web3AuthContext) as IWeb3AuthContext
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        const loadInfo = async () => {
            const user = await getUserInfo()
            setUser(user);
        }

        loadInfo();
    }, [])

    return <p>
        {user?.email}
    </p>
}