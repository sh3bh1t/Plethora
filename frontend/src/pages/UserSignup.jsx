import React, { useState } from 'react';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { UserContext, UserDataContext } from '../context/UserContext.jsx';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userSignupData, setUserSignupData] = useState({});

  // Change here: Correctly destructure as an array
  const [user, setUser] = React.useContext(UserDataContext); // Destructure as an array

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      email: email,
      password: password,
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser);
    if (response.status === 201) {
      const data = response.data;

      console.log(data.user);
      setUser(data.user); // Update the user context with new user data
      
      localStorage.setItem('token',data.token);
      navigate('/u/home');
    }

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className="w-full mb-1" src="/images/cover-removebg-preview.png" alt="_plethora_logo" />
        <form onSubmit={submitHandler}>
          <h3 className="text-xl mb-2 font-medium">What's your name?</h3>
          <div className="flex gap-4 ">
            <input
              type="text"
              placeholder="first name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="text-lg bg-[#eeeeee] rounded border px-4 py-2 mb-2 w-1/2 placeholder:text-sm "
            />
            <input
              type="text"
              placeholder="last name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="text-lg bg-[#eeeeee] rounded border px-4 py-2 mb-2 w-1/2 placeholder:text-sm "
            />
          </div>
          <h3 className="text-xl mb-2 font-medium">What's your email?</h3>
          <input
            type="email"
            placeholder="example@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-lg bg-[#eeeeee] rounded border px-4 py-2 mb-2 w-full placeholder:text-sm "
          />
          <h3 className="mt-2 mb-2 text-xl font-medium">Enter Password</h3>
          <input
            type="password"
            placeholder="enter password here"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded text-lg placeholder:text-sm bg-[#eeeeee] w-full px-4 py-2 mb-7"
          />
          <button className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-1 mb-2 text-lg">
            Sign Up <FontAwesomeIcon className="pl-2" icon={faArrowRight} />
          </button>
          <Link to={'/u/login'} className="text-blue-600 text-center px-10 mt-2 ">
            Already have an account? Sign In!
          </Link>
        </form>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          By agreeing to continue you consent to company privacy policies and usage and agree to receive calls, texts/SMSs from company and its affiliates
        </p>
      </div>
    </div>
  );
};

// Wrap the UserSignup component with Router and UserContext
ReactDOM.render(
  <Router>
    {/* Wrap UserSignup with the UserContext provider */}
    <UserContext>
      <UserSignup />
    </UserContext>
  </Router>,
  document.getElementById('root')
);

export default UserSignup;
