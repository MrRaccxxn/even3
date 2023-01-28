export type IEvent = {
    id: string;
    title: string;
    description: string;
    date: string;
    hasContractLinked?: boolean;
    requirePoap?: boolean;
    poster: string;
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

type IEventFormPre = Omit<IEvent, "id" | "hasContractLinked" | "attendees" | "eventAddress" | "poster">;

export interface IEventForm extends IEventFormPre {
    poster: File[];
}
