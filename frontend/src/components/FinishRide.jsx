import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faUser, faLocationDot, faMoneyBill1Wave, faStreetView } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const FinishRide = (props) => {

    const navigate = useNavigate();
    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{ 
                rideId: props.rideData._id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`

            }
        })
    if (response.status === 200) {
        navigate('/d/home')
    }
}
return (
    <div >
        <h5 className='p-3 text-center w-full absolute top-0'
            onClick={() => props.setFinishRidePanel(false)}
        ><FontAwesomeIcon icon={faChevronDown} /></h5>
        <h4 className='mb-2 text-lg font-medium'>Confirm Ride to start</h4>
        <div className='flex items-center justify-between mt-3 bg-gray-200 rounded-lg p-3'>
            <div className='flex items-center gap-3 '>
                <img className='h-10 w-10 rounded-full object-cover' src="https://png.pngtree.com/png-vector/20240427/ourlarge/pngtree-user-profile-account-brush-donut-shape-icon-vector-png-image_12327711.png" alt="" />
                <h2 className='text-m font-medium'>{props.rideData?.user.fullname.firstname}</h2>
            </div>
            <h5 className='text-m font-medium'>8.3 Km</h5>
        </div>
        <div className='flex gap-2 justify-between flex-col items-center mt-5'>
            <div className='w-full'>
                <div className='flex items-center p-3 border-b-2'>
                    <div className='flex items-center'>
                        <FontAwesomeIcon className='text-xl ml-5 mr-5' icon={faLocationDot} />
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm text-gray-600'>{props.rideData?.destination}</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center p-3 border-b-2'>
                    <div className='flex items-center'>
                        <FontAwesomeIcon className='text-xl ml-5 mr-5' icon={faStreetView} />
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className='text-sm text-gray-600'>{props.rideData?.pickup}</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center p-3 '>
                    <div className='flex items-center'>
                        <FontAwesomeIcon className='text-xl ml-5 mr-5' icon={faMoneyBill1Wave} />
                        <div>
                            <h3 className='text-lg font-medium'>&#8377;{props.rideData?.fare} </h3>
                            <p className='text-sm text-gray-600'>CASH</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className=' mt-10'>
                <button
                    onClick={endRide}
                    className='w-full bg-green-600 flex justify-center text-white font-semibold px-3 py-3 rounded-lg '>Finish this Ride</button>
            </div>
        </div>
    </div>
)
}
