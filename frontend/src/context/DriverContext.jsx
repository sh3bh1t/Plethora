import React, { createContext, useContext, useState } from 'react'


export const DriverDataContext = createContext();

export const DriverContext = ({ children }) => {

    const [driver,setDriver] = useState(null);
    const [isLoading, setIsLoading]= useState(false);
    const [error,setError]=useState(null);

    const updateDriver= (DriverData) =>{
        setDriver(DriverData);
    }

    const value={
        driver,setDriver,
        isLoading,setIsLoading,
        error,setError,
        updateDriver
    };

    return (
        <div>
            <DriverDataContext.Provider value={value}>
                {children}
            </DriverDataContext.Provider>
        </div>
    )
}
