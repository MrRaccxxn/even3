export interface IUseQueryResponse<T> {
    data: Array<T> | null;
    isLoading: boolean;
    isError: boolean;
    refetch: () => void,
    isSuccess: boolean
}