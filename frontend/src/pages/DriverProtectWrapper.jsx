import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DriverDataContext } from '../context/DriverContext';
import axios from 'axios';


export const DriverProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { driver, setDriver } = useContext(DriverDataContext);
  const [ isLoading, setIsLoading ] = useState(true);
  useEffect(() => {
    if (!token) {
      navigate('/u/login');
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/driver/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          setDriver(response.data.driver);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem('token');
        navigate('/d/login');
      })
  }, [token]);

  

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div>
      {children}
    </div>
  )
}
