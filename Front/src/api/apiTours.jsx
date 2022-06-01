import axios from 'axios';

const axiosTour = axios.create({
    baseURL: 'http://localhost:3000/api/v1/tours',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

axiosTour.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        let res = error.response;
        console.error(res.status);
        return Promise.reject(error);
    }
);

export default axiosTour;