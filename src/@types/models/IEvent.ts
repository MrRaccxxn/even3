export type IEvent = {
    title: string;
    description: string;
    startDate: string;
    finalDate: string;
    file: any;
}

export interface IEventModel extends IEvent {
    owner: string;
}