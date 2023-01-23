export type IEvent = {
    id: string;
    title: string;
    description: string;
    date: string;
    file?: any;
    owner?: string;
    eventAddress?: string;
    location?: string;
}
export interface IEventFilters {
    id?: string;
    owner?: string;
}