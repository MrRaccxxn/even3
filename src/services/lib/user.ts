import { IIUserModel, IUserFilters } from "@/types/models/IUser";
import axiosClient from "../axiosClient";

export async function getUser(filter: IUserFilters) {
    axiosClient.defaults.headers.get['Content-Type'] = 'application/json';
    return axiosClient.get<IIUserModel[]>(`/user`, {
        params: filter
    }).then(response => response);
}