import axiosClient from "../axiosClient";

export function ping() {
    return axiosClient.get(`/ping`).then(response => response);
}