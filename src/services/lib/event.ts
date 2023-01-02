import { IEvent, IEventFilters } from "@/types/models/IEvent";
import axiosClient from "../axiosClient";

export async function createEvent(data: FormData) {
    axiosClient.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    return axiosClient.post(`/event`, data).then(response => response);
}

export async function getEvents(filter: IEventFilters) {
    axiosClient.defaults.headers.post['Content-Type'] = 'application/json';
    return axiosClient.get<IEvent[]>(`/event`, {
        params: filter
    }).then(response => response);
}