export type IEvent = {
    id: string;
    title: string;
    description: string;
    date: string;
    hasContractLinked?: boolean;
    poster?: string;
    owner?: string;
    eventAddress?: string;
    location?: string;
    badgeImage?: string;
    attendees?: Array<any>;
    eventLink?: string;
}

export interface IEventFilters {
    id?: string;
    owner?: string;
}

export type IEventForm = Omit<IEvent, "attendees">;