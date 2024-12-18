import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faUser, faLocationDot, faMoneyBill1Wave, faStreetView } from '@fortawesome/free-solid-svg-icons';
export const RidePopUp = (props) => {
    // if (!props.ride) {
    //     console.log('no rides as of now'); // Render nothing if ride data is not available
    // }
    return (
        <div>
            <h5 className='p-3 text-center w-full absolute top-0' 
                onClick={()=> props.setRidePopUpPanel(false)}
            ><FontAwesomeIcon icon={faChevronDown} /></h5>
            <h4 className='mb-2 text-lg font-medium'>Choose to Accept a new Ride...</h4>
            <div className='flex items-center justify-between mt-3 bg-gray-200 rounded-lg p-3'>
                <div className='flex items-center gap-3 '>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://png.pngtree.com/png-vector/20240427/ourlarge/pngtree-user-profile-account-brush-donut-shape-icon-vector-png-image_12327711.png" alt="" />
                    <h2 className='text-m font-medium'>{props.ride?.user.fullname.firstname}</h2>
                </div>
                <h5 className='text-m font-medium'>8.3 Km</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center mt-5'>
                <div className='w-full'>
                    <div className='flex items-center p-3 border-b-2'>
                        <div className='flex items-center'>
                            <FontAwesomeIcon className='text-xl ml-5 mr-5' icon={faLocationDot} />
                            <div>
                                <h3 className='text-lg font-medium'>Pickup</h3>
                                <p className='text-sm text-gray-600'>{props.ride?.pickup}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center p-3 border-b-2'>
                        <div className='flex items-center'>
                            <FontAwesomeIcon className='text-xl ml-5 mr-5' icon={faStreetView} />
                            <div>
                                <h3 className='text-lg font-medium'>Destination</h3>
                                <p className='text-sm text-gray-600'>{props.ride?.destination}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center p-3 '>
                        <div className='flex items-center'>
                            <FontAwesomeIcon className='text-xl ml-5 mr-5' icon={faMoneyBill1Wave} />
                            <div>
                                <h3 className='text-lg font-medium'>&#8377;{props.ride?.fare}</h3>
                                <p className='text-sm text-gray-600'>CASH</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='flex gap-3 flex-row mt-1'>
                <button
                    onClick={() => {
                        props.setConfirmRidePopUpPanel(true)
                        props.confirmRide()
                    }}
                    className='w-1/2 bg-green-600 text-white font-semibold px-3 py-3 rounded-lg '>Accept</button>
                <button
                    onClick={() => {
                         props.setRidePopUpPanel(false)
                    }}
                    className='w-1/2 bg-gray-300 text-gray-700 font-semibold px-3 py-3 rounded-lg '>Ignore</button>
                </div>
            </div>
        </div>
    )
}
