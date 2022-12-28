import { useQuery } from 'react-query';
import { getUser } from '../services/lib/user';

export const useUser = async () => {
    const { data: user, error } = useQuery('useUser', getUser);

    if (!error) {
        return user;
    }

    return user;
}