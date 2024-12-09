import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faUser, faLocationDot, faMoneyBill1Wave, faStreetView } from '@fortawesome/free-solid-svg-icons';
export const ConfirmRidePanel = (props) => {
  return (
    <div>
      <h5 className='p-3 text-center w-full absolute top-0' onClick={() => props.setConfirmRidePanel(false)}><FontAwesomeIcon icon={faChevronDown} /></h5>
      <h4 className='mb-2 text-lg font-medium'>Confirm your ride</h4>

      <div className='flex gap-2 justify-between flex-col items-center mt-5'>
        <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png" alt="car_image" />
        <div className='w-full'>
          <div className='flex items-center p-3 border-b-2'>
            <div className='flex items-center'>
              <FontAwesomeIcon className='text-xl ml-5 mr-5' icon={faLocationDot} />
              <div>
                <h3 className='text-lg font-medium'>562/11A</h3>
                <p className='text-sm text-gray-600'>Third wave coffee, 80 ft Rd, Bengaluru</p>
              </div>
            </div>
          </div>
          <div className='flex items-center p-3 border-b-2'>
            <div className='flex items-center'>
              <FontAwesomeIcon className='text-xl ml-5 mr-5' icon={faStreetView} />
              <div>
                <h3 className='text-lg font-medium'>562/11A</h3>
                <p className='text-sm text-gray-600'>Third wave coffee, 80 ft Rd, Bengaluru</p>
              </div>
            </div>
          </div>
          <div className='flex items-center p-3 '>
            <div className='flex items-center'>
              <FontAwesomeIcon className='text-xl ml-5 mr-5' icon={faMoneyBill1Wave} />
              <div>
                <h3 className='text-lg font-medium'>&#8377;193.20 </h3>
                <p className='text-sm text-gray-600'>CASH</p>
              </div>
            </div>
          </div>

        </div>
        <button
          onClick={() =>{
            props.setVehicleFound(true) 
          props.setConfirmRidePanel(false)
        }}
        className='w-full bg-green-600 text-white font-semibold px-2 py-3 rounded-lg mt-5'>Confirm</button>
    </div>

    </div >
  )
}
