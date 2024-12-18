import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useContext } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, BrowserRouter as Router } from 'react-router-dom'
import { LocationSearchPanel } from '../components/LocationSearchPanel';
import { VehiclePanel } from '../components/VehiclePanel'
import { ConfirmRidePanel } from '../components/ConfirmRidePanel'
import { LookingForDriver } from '../components/LookingForDriver'
import { WaitingForDriver } from '../components/WaitingForDriver'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState('pickup');
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const [user] = useContext(UserDataContext);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehickeFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    setPickup('');
    setDestination('');
  }


  let cancelToken;

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })
  }, [user])


  socket.on('ride-confirmed', ride => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  })

  socket.on('ride-started', ride => {
    setWaitingForDriver(false);
    navigate('/riding')
  })

  const fetchSuggestions = async (input) => {
    try {
      if (cancelToken) {
        cancelToken.cancel("Request canceled due to new input.");
      }

      cancelToken = axios.CancelToken.source();

      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions?input=${input}`,
        {
          cancelToken: cancelToken.token,
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
          }
        }
      );

      const uniqueSuggestions = response.data.filter((value, index, self) =>
        index === self.findIndex((t) => t.description === value.description)
      );

      setSuggestions(uniqueSuggestions);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.error(error);
      }
    }
  };




  const handlePickupChange = (e) => {
    setPickup(e.target.value);
    setActiveField('pickup'); // Added
    fetchSuggestions(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    setActiveField('destination'); // Added
    fetchSuggestions(e.target.value);
  };

  const handleSelectSuggestion = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion.description);  // Adjust this based on your data structure
    } else {
      setDestination(suggestion.description);
    }
    setIsPanelOpen(false);  // Close the suggestion panel
  };

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



  async function findATrip() {
    setVehiclePanel(true);
    setIsPanelOpen(false);

    cancelToken = axios.CancelToken.source();

    const token = localStorage.getItem('token');

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare?pickup=${pickup}&destination=${destination}`,
      {
        cancelToken: cancelToken.token,
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        }
      }
    );
    console.log(response.data);
    setFare(response.data);
  }

  async function createRide() {

    const token = localStorage.getItem('token');

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType
      },
      {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        }
      }
    );
    console.log(response.data);
  }

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
        <div className='h-[35%] p-5 bg-white relative '>
          <h4 className='absolute top-1 left-3 opacity-0' ref={panelCloseRef} onClick={() => setIsPanelOpen(false)}><FontAwesomeIcon icon={faChevronDown} /></h4>
          <h4 className='text-2xl font-semibold '> Find a trip </h4>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className='line absolute h-16 w-1 top-[40%] left-10 bg-gray-700 rounded-lg '></div>
            <input
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-6 '
              type="text"
              value={pickup}
              required
              onChange={handlePickupChange}
              onClick={() => setIsPanelOpen(true)}
              placeholder='Add a Pick-up Location'
            />
            <input
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3 mb-5'
              type="text"
              value={destination}
              required
              onChange={handleDestinationChange}
              onClick={() => setIsPanelOpen(true)}
              placeholder='Add Destination Location'
            />
          </form>
          <button
            onClick={findATrip}
            className="bg-black text-white w-full px-4 py-2  rounded-lg">
            Find a trip
          </button>
        </div>
        <div ref={panelRef} className=' bg-white h-0'>
          {isPanelOpen && (
            <LocationSearchPanel
              suggestions={suggestions}
              setIsPanelOpen={setIsPanelOpen}
              setVehiclePanel={setVehiclePanel}
              onSelect={handleSelectSuggestion}
            />
          )}
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8'>
        <VehiclePanel selectVehicle={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8'>
        <ConfirmRidePanel
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>
      <div ref={vehickeFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8'>
        <LookingForDriver
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound} />
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-8'>
        <WaitingForDriver
          ride={ride}
          setWaitingForDriver={setWaitingForDriver}
          setVehicleFound={setVehicleFound}
          waitingForDriver={WaitingForDriver} />
      </div>
    </div>
  )
}
// ReactDOM.render(<Router><Home /></Router>, document.getElementById('root'));
export default Home
