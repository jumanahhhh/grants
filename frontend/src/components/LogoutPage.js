import { useEffect } from "react";
import axios from "../api/axiosConfig"; // Adjust the path to match your project structure

const handleLogout = async () => {
    try {
        const response = await axios.get(`/logout`, {withCredentials:true}); // Axios handles the base URL and credentials

        if (response.status === 200) {
            // Redirect user to login page after successful logout
            window.location.href = '/login';
        } else {
            console.error('Failed to log out:', response.statusText);
        }
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

const LogoutPage = () => {
    useEffect(() => {
        handleLogout();
    }, []);

    return <p>Logging out...</p>; // Optional: Show a message while logging out
};

export default LogoutPage;
