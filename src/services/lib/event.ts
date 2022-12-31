import axiosClient from "../axiosClient";

export async function createEvent(data: FormData) {
    axiosClient.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    return axiosClient.post(`/event`, data).then(response => response);
}

export async function getEvents(subId: string | null = null) {
    axiosClient.defaults.headers.post['Content-Type'] = 'application/json';
    return axiosClient.get(`/event/${subId}`).then(response => response);
}