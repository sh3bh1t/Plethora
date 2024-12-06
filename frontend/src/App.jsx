import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import DriverSignup from './pages/DriverSignup'
import DriverLogin from './pages/DriverLogin'
import { Home } from './pages/Home'
import { UserProtectWrapper } from './pages/UserProtectWrapper'
import { UserLogout } from './pages/UserLogout'
import { DriverHome } from './pages/DriverHome'
import { DriverProtectWrapper } from './pages/DriverProtectWrapper'
import { DriverLogout } from './pages/DriverLogout'

const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/u/signup' element={<UserSignup/>} />
        <Route path='/u/login' element={<UserLogin/>} />
        <Route path='/d/signup' element={<DriverSignup/>} />
        <Route path='/d/login' element={<DriverLogin/>} />
        <Route path='/u/home' element={<UserProtectWrapper><Home/></UserProtectWrapper>} />
        <Route path='/u/logout' element={<UserProtectWrapper><UserLogout/></UserProtectWrapper>} />
        <Route path='/d/home' element={<DriverProtectWrapper><DriverHome/></DriverProtectWrapper>} />
        <Route path='/d/logout' element={<DriverProtectWrapper><DriverLogout/></DriverProtectWrapper>} />
      </Routes>
    </div>
  )
}

export default App