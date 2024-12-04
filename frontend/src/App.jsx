import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import DriverSignup from './pages/DriverSignup'
import DriverLogin from './pages/DriverLogin'

const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/u/signup' element={<UserSignup/>} />
        <Route path='/u/login' element={<UserLogin/>} />
        <Route path='/d/signup' element={<DriverSignup/>} />
        <Route path='/d/login' element={<DriverLogin/>} />
      </Routes>
    </div>
  )
}

export default App