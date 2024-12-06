import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


const UserLogin = () => {
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-full mb-1' src="/images/cover-removebg-preview.png" alt="_plethora_logo" />
        <form>
          <h3 className='text-xl mb-2 font-medium'>What's your email?</h3>
          <input type="email"
            placeholder='example@example.com'
            required
            className='text-lg bg-[#eeeeee] rounded border px-4 py-2 mb-4 w-full placeholder:text-sm '
          />
          <h3 className='mt-2 mb-2 text-xl font-medium'>Enter Password</h3>
          <input type="password"
            placeholder='enter password here'
            required
            className=' border rounded text-lg placeholder:text-sm bg-[#eeeeee] w-full px-4 py-2 mb-7'
          />
          <Link className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-1 mb-2 text-lg'
          >Login <FontAwesomeIcon className='pl-2' icon={faArrowRight} /></Link>
          <Link to={'/u/signup'} className='text-blue-600 text-center px-10 mt-2 '>Don't have an account? Sign Up!</Link>
        </form>
      </div>
      <div>
          <Link className='flex items-center justify-center w-full text-white py-3 rounded mt-1 mb-2 text-lg bg-[#898a83]'>
          Sign In as Driver</Link>
      </div>
    </div>
  )
}
ReactDOM.render(<Router><UserLogin /></Router>, document.getElementById('root'));
export default UserLogin