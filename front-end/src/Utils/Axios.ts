import axios, { AxiosInstance } from "axios";
import { isAuthenticated } from "./Auth";

// Function to create Axios instance with base URL and credentials
const createInstance = (baseURL: string): AxiosInstance => {
    return axios.create({
        baseURL: baseURL,
        withCredentials: true,
    });
};

// Initialize instance with default users baseURL
let instance: AxiosInstance = createInstance("http://localhost:8080/users");

// Asynchronous function to configure instance based on role
const configureInstance = async () => {
    try {
        const role = await isAuthenticated();

        if (role === 'admin') {
            instance = createInstance("http://localhost:8080/admin");
        }
    } catch (error) {
        console.error('Failed to authenticate:', error);
        // Handle error if needed
    }
};

// Call function to configure instance based on role
configureInstance();

// Export the configured instance
export default instance;
