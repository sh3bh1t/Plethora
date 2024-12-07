import React,{useContext, useEffect, useState} from 'react'
import { UserDataContext } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const UserProtectWrapper = ({ children }) => {

    const token= localStorage.getItem('token');
    const navigate = useNavigate();
    const [ user, setUser ] = useContext(UserDataContext);
    const [ isLoading, setIsLoading ] = useState(true);
    useEffect(()=>{
        if(!token){
            navigate('/u/login');
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then((response) => {
              if (response.status === 200) {
                setUser(response.data.user);
                setIsLoading(false);
              }
            })
            .catch((error) => {
              console.log(error);
              localStorage.removeItem('token');
              navigate('/u/login');
            })
    },[token]);

    if (isLoading) {
        return (
          <div>Loading... fetching data...</div>
        )
      }
    
    return (
        <>
            {children}
        </>
    )
}
