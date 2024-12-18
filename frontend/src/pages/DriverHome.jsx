import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faUser, faLocationDot, faMoneyBill1Wave, faStreetView, faHouseUser, faArrowRightFromBracket, faHourglassEnd, faGaugeSimpleHigh, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { DriverDetails } from '../components/DriverDetails';
import { RidePopUp } from '../components/RidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ConfirmRidePopUp } from '../components/ConfirmRidePopUp';
import { SocketContext } from '../context/SocketContext';
import { useEffect, useContext } from 'react';
import { DriverDataContext } from '../context/DriverContext';
import axios from 'axios';
export const DriverHome = () => {

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { driver } = useContext(DriverDataContext);

  useEffect(() => {
    socket.emit('join', {
      userId: driver._id,
      userType: 'driver'
    })

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          console.log('Location: \n lat: \n lng: ', position.coords.latitude, position.coords.longitude);
          socket.emit('update-location-driver', {
            userId: driver._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
          const { latitude, longitude } = position.coords;
        });
      }
    };
    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
    // return () => clearInterval(locationInterval);
  })


  socket.on('new-ride', (data) => {
    console.log('New Ride:', data);
    setRide(data);
    setRidePopUpPanel(true);
  })

  async function confirmRide() {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      driverId: driver._id,
    },{headers:{
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }})

    setRidePopUpPanel(false);
    setConfirmRidePopUpPanel(true);
  }

  useGSAP(function () {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopUpPanel])

  useGSAP(function () {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopUpPanel])


  return (
    <div className='h-screen'>
      <div className='fixe flex items-center justify-between w-screen'>
        <img className='w-12 absolute left-5 top-2' src="/images/default.png" alt="plethora_logo" />
        <Link to={'/d/logout'} className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <FontAwesomeIcon className='text-lg font-medium' icon={faArrowRightFromBracket} />
        </Link>
      </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='h-2/5 p-4'>
        <DriverDetails />
      </div>
      <div ref={ridePopUpPanelRef} className='fixed w-full z-10 translate-y-full bottom-0  bg-white px-3 py-10 pt-12'>
        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} 
          confirmRide={confirmRide} />
      </div>
      <div ref={confirmRidePopUpPanelRef} className='fixed h-[95%] w-full z-10 translate-y-full bottom-0  bg-white px-3 py-10 pt-12'>
        <ConfirmRidePopUp
        ride={ride}
        setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel} />
      </div>
    </div>
  )
}
