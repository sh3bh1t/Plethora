import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faUser, faLocationDot, faMoneyBill1Wave, faStreetView, faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
export const Riding = () => {
    return (
        <div className='h-screen'>
            <Link to={'/u/home'} className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <FontAwesomeIcon className='text-lg font-medium' icon={faHouseUser} />
            </Link>
            <div className='h-1/2'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between mt-1'>
                    <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png" alt="car_image" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium -mt-1'>Test_Driver</h2>
                        <h4 className='text-lg font-medium -mt-1'>DL XX XX X4X3</h4>
                        <p className='text-sm text-gray-600 -mt-1'>White Suzuki WagonR</p>
                    </div>
                </div>
                <div className='flex gap-2 justify-between flex-col items-center mt-2'>
                    <div className='w-full'>
                        <div className='flex items-center p-3 border-b-2'>
                            <div className='flex items-center'>
                                <FontAwesomeIcon className='text-xl ml-5 mr-5' icon={faLocationDot} />
                                <div>
                                    <h3 className='text-m font-medium'>562/11A</h3>
                                    <p className='text-xs text-gray-600'>Third wave coffee, 80 ft Rd, Bengaluru</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center p-3 '>
                            <div className='flex items-center'>
                                <FontAwesomeIcon className='text-xl ml-5 mr-5' icon={faMoneyBill1Wave} />
                                <div>
                                    <h3 className='text-m font-medium'>&#8377;193.20 </h3>
                                    <p className='text-xs text-gray-600'>CASH</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <button className='w-full bg-green-600 text-white font-semibold px-2 py-3 rounded-lg mt-5'>Make a payment</button>
                </div>

            </div>
        </div>
    )
}
