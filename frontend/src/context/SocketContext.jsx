import React, { createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`); // Update with your server URL if different

export const SocketProvider = ({ children }) => {

    useEffect(() => {
        // Connection established
        socket.on('connect', () => {
            console.log('Connected to server:', socket.id);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // Cleanup on unmount
        
    }, [socket]);


    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};