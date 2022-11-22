import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        let res = error.response;
        if (res.status == 401) {
            window.location.href = process.env.NEXT_PUBLIC_BASE_URL || '';
        }
        console.error('Something were wrong', res.status)
        return Promise.reject(error);
    }
);

export default axiosClient;