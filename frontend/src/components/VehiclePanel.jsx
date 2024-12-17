import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown ,faUser } from '@fortawesome/free-solid-svg-icons';
export const VehiclePanel = (props) => {
  return (
    <div>
        <h5 className='p-3 text-center w-full absolute top-0' onClick={()=>props.setVehiclePanel(false)}><FontAwesomeIcon icon={faChevronDown} /></h5>
        <h4 className='mb-2 text-lg font-medium'>Choose a vehicle</h4>
          <div  onClick={()=>{
          props.setConfirmRidePanel(true)
          props.selectVehicle('car')
        }}
           className='flex w-full p-3 mb-2  active:bg-gray-400  border-2 border-black rounded-xl items-center justify-between'>
            <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png" alt="car_image" />
            <div className=' w-1/2'>
              <h4 className='font-medium text-sm'>PlethoraGo <span><FontAwesomeIcon className='text-3xl' icon={faUser} /> 4</span></h4>
              <h5 className='font-medium text-sm'>2 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable , Compact rides</p>
            </div>
            <h2 className='text-lg font-semibold pr-2'>&#8377;{props.fare.car}</h2>
          </div>
          <div  onClick={()=>{
          props.setConfirmRidePanel(true)
          props.selectVehicle('motorcycle')
        }}
          className='flex w-full p-3 mb-2 active:bg-gray-400  border-2 border-black rounded-xl items-center justify-between'>
            <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="bike_image" />
            <div className=' w-1/2'>
              <h4 className='font-medium text-sm'>PlethoraMoto <span><FontAwesomeIcon icon={faUser} /> 1</span></h4>
              <h5 className='font-medium text-sm'>5 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable , Motorcycle rides</p>
            </div>
            <h2 className='text-lg font-semibold pr-2'>&#8377;{props.fare.motorcycle}</h2>
          </div>
          <div onClick={()=>{
            props.setConfirmRidePanel(true)
            props.selectVehicle('auto')
          }}
           className='flex w-full p-3 mb-2  active:bg-gray-400 border-2 border-black rounded-xl items-center justify-between'>
            <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="auto_image" />
            <div className=' w-1/2'>
              <h4 className='font-medium text-sm'>PlethoraAuto <span><FontAwesomeIcon icon={faUser} /> 3</span></h4>
              <h5 className='font-medium text-sm'>1 mins away</h5>
              <p className='font-normal text-xs text-gray-600'>Affordable , Auto rides</p>
            </div>
            <h2 className='text-lg font-semibold pr-2'>&#8377;{props.fare.auto}</h2>
          </div>
    </div>
  )
}
