import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Try to access a protected route (e.g., /dashboard)
                await axios.get('/dashboard', {withCredentials:true});
                setIsAuthenticated(true); // User is authenticated
            } catch (error) {
                setIsAuthenticated(false); // User is not authenticated
            } finally {
                setLoading(false); // Loading is done
            }
        };

        checkAuth();
    }, []);

    // While loading, show a loading message or spinner
    if (loading) return <div>Loading...</div>;

    // If not authenticated, redirect to login page
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // If authenticated, render the child route (Dashboard)
    return children;
};

export default ProtectedRoute;
