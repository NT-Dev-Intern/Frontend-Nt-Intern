import axios, { AxiosInstance } from "axios";
const instance: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
});

export default instance;