import axiosClient from "../axiosClient";

export function createEvent(data: any) {
    return axiosClient.post(`/event`, data).then(response => response);
}

export function getEvents() {
    return axiosClient.get(`/event`).then(response => response);
}