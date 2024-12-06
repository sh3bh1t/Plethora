import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export const DriverLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/d/login');
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/driver/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/d/login');
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    console.log('Token expired or invalid. Navigating to login.');
                    localStorage.removeItem('token');
                    navigate('/d/login');
                } else {
                    console.log('Error during logout request:', error);
                    navigate('/d/login');
                }
            });
    }, [navigate]);


    return (
        <div>DriverLogout</div>
    )
}
