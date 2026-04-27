import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.0.160:5001/api",
    withCredentials: true,
});

export default api;
