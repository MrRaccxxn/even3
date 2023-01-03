import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`
});

axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },

);

if (typeof window !== 'undefined') {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
}

export default axiosClient;