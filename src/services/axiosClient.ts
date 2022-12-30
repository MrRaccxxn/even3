import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        let res = error.response;
        console.log('res', res)
        if (res.status == 401) {
            window.location.href = process.env.NEXT_PUBLIC_BASE_URL || '';
        }
        console.error('Something were wrong', res.status)
        return Promise.reject(error);
    }
);

if (typeof window !== 'undefined') {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
}

export default axiosClient;