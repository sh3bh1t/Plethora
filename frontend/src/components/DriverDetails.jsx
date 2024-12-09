import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faUser, faLocationDot, faMoneyBill1Wave, faStreetView, faHouseUser, faArrowRightFromBracket, faHourglassEnd,faGaugeSimpleHigh,faClipboard } from '@fortawesome/free-solid-svg-icons';
export const DriverDetails = () => {
    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-3'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://png.pngtree.com/png-vector/20240427/ourlarge/pngtree-user-profile-account-brush-donut-shape-icon-vector-png-image_12327711.png" alt="" />
                    <h4 className='text-lg font-medium'>Test Driver</h4>
                </div>
                <div>
                    <h4 className='text-xl font-semibold'>&#8377;252.20</h4>
                    <p className='text-sm text-gray-600'>Earned</p>
                </div>
            </div>
            <div className='p-3 bg-gray-200 rounded-lg flex justify-center gap-5 items-start mt-6'>
                <div className='text-center'>
                    <FontAwesomeIcon className='text-3xl mb-2 font-thin' icon={faHourglassEnd} />
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <FontAwesomeIcon className='text-3xl mb-2 font-thin' icon={faGaugeSimpleHigh} />
                    <h5 className='text-lg font-medium'>11.5</h5>
                    <p className='text-sm text-gray-600'>KMs Covered</p>
                </div>
                <div className='text-center'>
                    <FontAwesomeIcon className='text-3xl mb-2 font-thin' icon={faClipboard} />
                    <h5 className='text-lg font-medium'>2</h5>
                    <p className='text-sm text-gray-600'>Rides Completed</p>
                </div>
            </div>
        </div>
    )
}
