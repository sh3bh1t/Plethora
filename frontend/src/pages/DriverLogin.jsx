import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {  DriverDataContext } from '../context/DriverContext.jsx';
import axios from 'axios';
import { DriverLogout } from './DriverLogout.jsx';

const DriverLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {  driver, setDriver } = React.useContext(DriverDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const driver = { email: email,
      password };
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/driver/login`, driver);
      if (response.status === 200) {
        const data = response.data;
        setDriver(data.driver); // Set driver data in context
        localStorage.setItem('token', data.token); // Store token in localStorage
        console.log('Login response:', response.data);
        console.log('Driver data after setting context:', data.driver);
        navigate('/d/home');
      
      }

    // Clear form inputs
    setEmail('');
    setPassword('');
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-full mb-1' src="/images/cover-removebg-preview.png" alt="_plethora_logo" />
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-xl mb-2 font-medium'>What's your email?</h3>
          <input type="email"
            placeholder='example@example.com'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='text-lg bg-[#eeeeee] rounded border px-4 py-2 mb-4 w-full placeholder:text-sm '
          />
          <h3 className='mt-2 mb-2 text-xl font-medium'>Enter Password</h3>
          <input type="password"
            placeholder='enter password here'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=' border rounded text-lg placeholder:text-sm bg-[#eeeeee] w-full px-4 py-2 mb-7'
          />
          <button className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-1 mb-2 text-lg'
          >Login <FontAwesomeIcon className='pl-2' icon={faArrowRight} /></button>
          <Link to={'/d/signup'} className='text-blue-600 text-center  px-10 mt-2 '>Wish to join? Sign Up as a Driver!</Link>
        </form>
      </div>
      <div>
        <Link to={'/u/login'} className='flex items-center justify-center w-full text-white py-3 rounded mt-1 mb-2 text-lg bg-[#565753]'>
          Sign In as User</Link>
      </div>
    </div>
  )
}
// ReactDOM.render(<Router><DriverContext>< DriverLogin /></DriverContext></Router>, document.getElementById('root'));
export default DriverLogin