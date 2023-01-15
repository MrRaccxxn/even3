export type IAudience = {
    id: string;
    eventId: string;
    attendees: [IAttendee]
}

export type IAttendee = {
    email: string;
    address: string;
}