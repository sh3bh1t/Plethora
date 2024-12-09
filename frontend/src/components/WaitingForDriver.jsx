import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faUser, faLocationDot, faMoneyBill1Wave, faStreetView } from '@fortawesome/free-solid-svg-icons';
export const WaitingForDriver = (props) => {
  return (
    <div >
      <h5 className='p-3 text-center w-full absolute top-0' onClick={() => props.WaitingForDriver(false)}><FontAwesomeIcon icon={faChevronDown} /></h5>
      <div className='flex items-center justify-between mt-2'>
        <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png" alt="car_image" />
        <div className='text-right'>
          <h2 className='text-lg font-medium -mt-1'>Test_Driver</h2>
          <h4 className='text-lg font-medium -mt-1'>DL XX XX X4X3</h4>
          <p className='text-sm text-gray-600 -mt-1'>White Suzuki WagonR</p>
        </div>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center mt-5'>
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
      </div>

    </div>
  )
}
