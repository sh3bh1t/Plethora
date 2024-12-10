import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faUser, faLocationDot, faMoneyBill1Wave, faStreetView, faHouseUser, faArrowRightFromBracket, faHourglassEnd, faGaugeSimpleHigh, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FinishRide } from '../components/FinishRide';
export const DriverRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef=useRef(null);

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePanel])


    return (
        <div className='h-screen'>
            <div className='fixe flex items-center justify-between w-screen'>
                <img className='w-12 absolute left-5 top-2' src="/images/default.png" alt="plethora_logo" />
                <Link to={'/d/logout'} className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <FontAwesomeIcon className='text-lg font-medium' icon={faArrowRightFromBracket} />
                </Link>
            </div>
            <div className='h-4/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className='h-1/5 p-4  bg-yellow-400 '
                onClick={()=>{
                    setFinishRidePanel(true)
                }}
            >
                <h5 className=' text-center w-full relative top-0'

                ><FontAwesomeIcon icon={faChevronDown} /></h5>
                <div className='flex gap-10 mt-4 items-center justify-evenly'>
                    <h4 className='text-xl font-semibold'>4 KM Away</h4>
                    <button className='w-1/2 bg-green-600 text-white font-semibold px-2 py-2 rounded-lg'>Complete Ride</button>
                </div>
            </div>
            <div ref={finishRidePanelRef} className='fixed h-[90%] w-full z-10 translate-y-full bottom-0  bg-white px-3 py-10 pt-12'>
                <FinishRide setFinishRidePanel={setFinishRidePanel} />
            </div>
        </div>
    )
}
