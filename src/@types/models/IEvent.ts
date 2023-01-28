export type IEvent = {
    id: string;
    title: string;
    description: string;
    date: string;
    hasContractLinked?: boolean;
    requirePoap?: boolean;
    poster: any;
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
    title?: string;
}

export type IEventForm = Omit<IEvent, "id" | "hasContractLinked" | "attendees" | "eventAddress">;
