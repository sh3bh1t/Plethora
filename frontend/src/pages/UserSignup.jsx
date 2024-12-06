import React, { useState } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const UserSignup = () => {
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userSignupData, setUserSignupData] = useState({});


  const submitHandler = (e) => {
    e.preventDefault();
    setUserSignupData({
      email: email,
      password: password,
      fullname: {
        firstName: firstName,
        lastName: lastName,
      }
    });
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    // console.log(userSignupData);

  }


  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-full mb-1' src="/images/cover-removebg-preview.png" alt="_plethora_logo" />
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-xl mb-2 font-medium'>What's your name?</h3>
          <div className='flex gap-4 '>
            <input type="text"
              placeholder='first name'
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='text-lg bg-[#eeeeee] rounded border px-4 py-2 mb-2 w-1/2 placeholder:text-sm '
            />
            <input type="text"
              placeholder='last name'
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className='text-lg bg-[#eeeeee] rounded border px-4 py-2 mb-2 w-1/2 placeholder:text-sm '
            />
          </div>
          <h3 className='text-xl mb-2 font-medium'>What's your email?</h3>
          <input type="email"
            placeholder='example@example.com'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='text-lg bg-[#eeeeee] rounded border px-4 py-2 mb-2 w-full placeholder:text-sm '
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
          >Sign Up <FontAwesomeIcon className='pl-2' icon={faArrowRight} /></button>
          <Link to={'/u/login'} className='text-blue-600 text-center  px-10 mt-2 '>Already have an account? Sign In!</Link>
        </form>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>By agreeing to continue you consent to company privacy policies and usage and agree to recive calls,texts/SMSs from company and it's affiliates</p>
      </div>
    </div>
  )
}
ReactDOM.render(<Router>< UserSignup /></Router>, document.getElementById('root'));
export default UserSignup