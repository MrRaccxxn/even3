import { IAttendee } from "@/types/models/IAudience";
import axiosClient from "../axiosClient";

export async function registerAttendee({ eventId, attendee }: { eventId: string, attendee: IAttendee }) {
    axiosClient.defaults.headers.get['Content-Type'] = 'application/json';
    return axiosClient.post(`/audience`, { eventId, ...attendee }).then(response => response);
}
