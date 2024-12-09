import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faUser,faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, BrowserRouter as Router } from 'react-router-dom'
import { LocationSearchPanel } from '../components/LocationSearchPanel'
import { VehiclePanel } from '../components/VehiclePanel'
import { ConfirmRidePanel } from '../components/ConfirmRidePanel'
import { LookingForDriver } from '../components/LookingForDriver'
import { WaitingForDriver } from '../components/WaitingForDriver'

export const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehickeFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    setPickup('');
    setDestination('');
  }


  useGSAP(function () {
    if (isPanelOpen) {
      gsap.to(panelRef.current, {
        height: '70%'
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%'
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [isPanelOpen])

  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])


  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehickeFoundRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehickeFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])


  return (
    <div className='h-screen relative'>
     <div className='fixe flex items-center justify-between w-screen'>
        <img className='w-12 absolute left-5 top-2' src="/images/default.png" alt="plethora_logo" />
        <Link to={'/u/logout'} className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <FontAwesomeIcon className='text-lg font-medium' icon={faArrowRightFromBracket} />
        </Link>
      </div>
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full '>
        <div className='h-[30%] p-5 bg-white relative '>
          <h4 className='absolute top-1 left-3 opacity-0' ref={panelCloseRef} onClick={() => setIsPanelOpen(false)}><FontAwesomeIcon icon={faChevronDown} /></h4>
          <h4 className='text-2xl font-semibold '> Find a trip </h4>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className='line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-lg '></div>
            <input className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5 '
              type="text"
              value={pickup}
              required
              onChange={(e) => setPickup(e.target.value)}
              onClick={() => setIsPanelOpen(true)}
              placeholder='Add a Pick-up Location' />
            <input className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3'
              type="text"
              value={destination}
              required
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => setIsPanelOpen(true)}
              placeholder='Add Destination Location' />
          </form>
        </div>
        <div ref={panelRef} className=' bg-white h-0'>
          <LocationSearchPanel setIsPanelOpen={setIsPanelOpen} setVehiclePanel={setVehiclePanel} />
        </div>

      </div>
      <div ref={vehiclePanelRef} className='fixed w-full  z-10 bottom-0 translate-y-full bg-white px-3 py-8'>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full  z-10 bottom-0 translate-y-full bg-white px-3 py-8'>
        <ConfirmRidePanel setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>
      <div ref={vehickeFoundRef} className='fixed w-full  z-10 bottom-0 translate-y-full bg-white px-3 py-8'>
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full  z-10 bottom-0  bg-white px-3 py-8'>
        <WaitingForDriver waitingForDriver={WaitingForDriver} />
      </div>
    </div>
  )
}
ReactDOM.render(<Router><Home /></Router>, document.getElementById('root'));
export default Home
