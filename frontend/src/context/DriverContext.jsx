import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DriverDataContext = createContext();

export const DriverContext = ({ children }) => {
    const [driver, setDriver] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDriver = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/driver/profile`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    console.log('Fetched Driver Data:', response.data);
                    setDriver(response.data);
                    // console.log("logged in driver :", response.data);
                } catch (error) {
                    console.error('Error fetching driver:', error);
                }
            }
            setIsLoading(false);
        };
        fetchDriver();
    }, []);
    

    return (
        <DriverDataContext.Provider value={{ driver, setDriver, isLoading }}>
            {children}
        </DriverDataContext.Provider>
    );
};
