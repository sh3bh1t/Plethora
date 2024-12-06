import React from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import { Link, Router } from 'react-router-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';
const Home = () => {
    return (
        <div>
            <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1569542609987-2c0e108c8bc9?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
                <img className='w-20  ml-6' src="/images/cover-removebg-preview.png" alt="Plethora_Logo" />
                <div className='bg-white  py-4 px-10 pb-7 text-center'>
                    <h2 className='text-3xl font-bold'>Get Started with Plethora</h2>
                    <Link to={'/u/login'} className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-4'>Continue <FontAwesomeIcon className='pl-2' icon={faArrowRight} /></Link>
                </div>
            </div>
        </div>
    )
}
ReactDOM.render(<Router><Home /></Router>, document.getElementById('root'));
export default Home