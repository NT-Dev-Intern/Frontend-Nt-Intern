import Axios from "@/Utils/Axios";

export const isAuthenticated = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        console.error('No token found, please log in first.');
        window.location.href = '/login';
        return;
    }

    try {
        const res = await Axios.get('/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // console.log('Protected data:', res.data);
    } catch (err) {
        console.error('Failed to fetch protected data:', err);
        window.location.href = '/login';
    }
};

