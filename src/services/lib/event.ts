import axiosClient from "../axiosClient";

export function createEvent(data: FormData) {
    axiosClient.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    return axiosClient.post(`/event`, data).then(response => response);
}

export function getEvents() {
    return axiosClient.get(`/event`).then(response => response);
}