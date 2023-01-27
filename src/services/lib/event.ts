import { IEvent, IEventFilters } from "@/types/models/IEvent";
import axiosClient from "../axiosClient";

export async function createEvent(data: FormData) {
    axiosClient.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    return axiosClient.post(`/event`, data)
        .then(response => response)
        .catch(error => console.log(error));

}

export async function registerAttendee(data: FormData) {
    axiosClient.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    return axiosClient.post(`/event/attendee`, data)
        .then(response => response)
        .catch(error => console.log(error));
}

export async function getEvents(filter: IEventFilters) {
    axiosClient.defaults.headers.get['Content-Type'] = 'application/json';
    return axiosClient.get<IEvent[]>(`/event`, {
        params: filter
    })
        .then(response => response)
        .catch(error => console.log(error));
}