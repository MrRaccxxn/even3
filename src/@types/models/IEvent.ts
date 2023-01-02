export type IEvent = {
    id: string;
    title: string;
    description: string;
    date: string;
    file?: any;
}

export interface IEventModel extends IEvent {
    owner: string;
}

export interface IEventFilters {
    id?: string;
    owner?: string;
}