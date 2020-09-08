import axios from 'axios'

const axiosCreate = axios.create(
    {
        baseURL: "http://localhost:3900/user/",
        timeout: 1000,
        headers: {
            "token": localStorage.getItem('token') ? localStorage.getItem('token') : null,
            "Content-Type": "application/json",
            "accept": "application/json",
        },
    });
    

    export default axiosCreate