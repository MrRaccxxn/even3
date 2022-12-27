import axiosClient from "../axiosClient";

export function createEvent(data: any) {
    return axiosClient.post(`/event`, data).then(response => response);
}