import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faUser, faLocationDot, faMoneyBill1Wave, faStreetView } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
export const ConfirmRidePopUp = (props) => {

    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            }, headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        setOtp('');
        props.setConfirmRidePopUpPanel(false);
        props.setRidePopUpPanel(false);
        navigate('/d/riding',{state:{ride:props.ride}});
    }


    return (
        <div >
            <h5 className='p-3 text-center w-full absolute top-0'
                onClick={() => props.setConfirmRidePopUpPanel(false)}
            ><FontAwesomeIcon icon={faChevronDown} /></h5>
            <h4 className='mb-2 text-lg font-medium'>Confirm Ride to start</h4>
            <div className='flex items-center justify-between mt-3 bg-gray-200 rounded-lg p-3'>
                <div className='flex items-center gap-3 '>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://png.pngtree.com/png-vector/20240427/ourlarge/pngtree-user-profile-account-brush-donut-shape-icon-vector-png-image_12327711.png" alt="" />
                    <h2 className='text-m font-medium'>{props.ride?.user.fullname.firstname} </h2>
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
                                <p className='text-sm text-gray-600'>{props.ride?.destination}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center p-3 border-b-2'>
                        <div className='flex items-center'>
                            <FontAwesomeIcon className='text-xl ml-5 mr-5' icon={faStreetView} />
                            <div>
                                <h3 className='text-lg font-medium'>Pickup</h3>
                                <p className='text-sm text-gray-600'>{props.ride?.pickup}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center p-3 '>
                        <div className='flex items-center'>
                            <FontAwesomeIcon className='text-xl ml-5 mr-5' icon={faMoneyBill1Wave} />
                            <div>
                                <h3 className='text-lg font-medium'>&#8377;{props.ride?.fare} </h3>
                                <p className='text-sm text-gray-600'>CASH</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='mt-6'>
                    <form onSubmit={(e) => submitHandler(e)}>
                        <input className='bg-[#eee] px-12 py-2 text-base rounded-lg font-mono w-full mt-1'
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            type="number"
                            placeholder='Enter OTP' />
                        <div className='flex gap-3 flex-row mt-6'>
                            <button className='w-1/2 bg-green-600 flex justify-center text-white font-semibold px-3 py-3 rounded-lg '>Confirm</button>
                            <button
                                onClick={() => {
                                    props.setConfirmRidePopUpPanel(false)
                                    props.setRidePopUpPanel(false)
                                }}
                                className='w-1/2 bg-red-500 text-white font-semibold px-3 py-3 rounded-lg '>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
