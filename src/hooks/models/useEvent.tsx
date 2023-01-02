import { IEventFilters } from '@/types/models/IEvent';
import { useQuery } from '@tanstack/react-query';
import { getEvents } from 'src/services/lib/event';
import { useToast } from '../useToast';

export const useEvent = ({ filter = {} }: { filter: IEventFilters }) => {
    const toast = useToast();
    const { data: events, isLoading, isError, refetch, isSuccess } = useQuery(
        ['get-events', filter], async () => {
            const eventsResponse = await getEvents(filter);
            return eventsResponse?.data;
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

    return { events, isLoading, isError, isSuccess, refetch }
}
