import { IAttendee } from "@/types/models/IAudience";
import axiosClient from "../axiosClient";

export async function registerAttendee({ eventId, eventAddress, attendee }: { eventId: string, eventAddress: string, attendee: IAttendee }) {
    axiosClient.defaults.headers.get['Content-Type'] = 'application/json';
    return axiosClient.post(`/audience`, { eventId, eventAddress, ...attendee }).then(response => response);
}
