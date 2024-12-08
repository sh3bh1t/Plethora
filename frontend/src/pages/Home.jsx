import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router } from 'react-router-dom'
import { LocationSearchPanel } from '../components/LocationSearchPanel'

export const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setPickup('');
    setDestination('');
  }

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);


  useGSAP(function () {
    if (isPanelOpen) {
      gsap.to(panelRef.current, {
        height: '70%'
      })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%'
      })
      gsap.to(panelCloseRef.current,{
        opacity:0
      })
    }
  }, [isPanelOpen])

  return (
    <div className='h-screen relative'>
      <img className='w-12 absolute left-5 top-5' src="/images/default.png" alt="plethora_logo" />
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full '>
        <div className='h-[30%] p-5 bg-white relative '>
          <h4 className='absolute top-1 left-3 opacity-0' ref={panelCloseRef} onClick={()=>setIsPanelOpen(false)}><FontAwesomeIcon icon={faChevronDown} /></h4>
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
            <LocationSearchPanel/>
        </div>
      </div>
    </div>
  )
}
ReactDOM.render(<Router><Home /></Router>, document.getElementById('root'));
export default Home
