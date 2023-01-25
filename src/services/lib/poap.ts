import { IPoap } from "@/types/models/IPoap";
import axiosClient from "../axiosClient";

export async function getPoapFromAddress({ address }: { address: string }) {
    axiosClient.defaults.headers.get['Content-Type'] = 'application/json';
    return axiosClient.get<IPoap[]>(`/poap`, {
        params: { address }
    })
        .then(response => response)
        .catch(error => console.log(error));
}