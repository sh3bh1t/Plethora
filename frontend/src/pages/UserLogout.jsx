import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export const UserLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/u/login');
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/u/login');
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    console.log('Token expired or invalid. Navigating to login.');
                    localStorage.removeItem('token');
                    navigate('/u/login');
                } else {
                    console.log('Error during logout request:', error);
                    navigate('/u/login');
                }
            });
    }, [navigate]);


    return (
        <div>UserLogout</div>
    )
}
