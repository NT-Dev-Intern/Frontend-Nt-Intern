import Axios from "@/Utils/Axios";

export const isAuthenticated = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        console.error('No token found, please log in first.');
    }

    try {
        const res = await Axios.get('/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data.user.role;
    } catch (err) {
        console.error('Failed to fetch protected data:', err);
        
    }
};

