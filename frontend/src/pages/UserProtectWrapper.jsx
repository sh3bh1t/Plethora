import React,{useContext, useEffect} from 'react'
import { UserDataContext } from '../context/UserContext.jsx'
import { useNavigate } from 'react-router-dom';
export const UserProtectWrapper = ({ children }) => {

    const token= localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(()=>{
        if(!token){
            navigate('/u/login');
        }
    },[token]);
    return (
        <>
            {children}
        </>
    )
}
