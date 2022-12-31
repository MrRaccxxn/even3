export type IEvent = {
    title: string;
    description: string;
    date: string;
    file: any;
}

export interface IEventModel extends IEvent {
    owner: string;
}