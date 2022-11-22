import axiosClient from "../axiosClient";

export function getUser() {
    return axiosClient.get(`/user`).then(response => response);
}
