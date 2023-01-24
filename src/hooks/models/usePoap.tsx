import { useQuery } from '@tanstack/react-query';
import { getPoapFromAddress } from 'src/services/lib/poap';
import { useToast } from '../useToast';

export const usePoap = ({ address }: { address: string }) => {
    const toast = useToast();
    const { data: poaps, isLoading, isError, refetch, isSuccess } = useQuery(
        ['get-poap-from-user', address], async () => {
            const poapResponse = await getPoapFromAddress({ address });
            return poapResponse?.data;
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

    return { poaps, isLoading, isError, isSuccess, refetch }
}
