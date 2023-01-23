import { IUserFilters } from '@/types/models/IUser';
import { useQuery } from '@tanstack/react-query';
import { getUser } from 'src/services/lib/user';
import { useToast } from '../useToast';

export const useUser = ({ filter = {} }: { filter: IUserFilters }) => {
    const toast = useToast();
    const { data: users, isLoading, isError, refetch, isSuccess } = useQuery(
        ['get-users', filter], async () => {
            const usersResponse = await getUser(filter);
            return usersResponse?.data;
        },

        {
            staleTime: 0.1 * 60 * 1000,
            cacheTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            onError: (error: Error) => {
                toast({ type: 'error', message: `Something were wrong ${error.message}` });
            }
        }
    )

    return { users, isLoading, isError, isSuccess, refetch }
}
