import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
export const LocationSearchPanel = (props) => {
    const locations = [
        "Kempegowda International Airport, KIAL Rd, Devanahalli , Bengaluru , Karnataka ",
        "Phoneix Marketcity, Whitefield road, Mahadevapura, Bengaluru , Karnataka",
        "Salarpuria Aura Block B , TOUCH STONE , Chandana , Bengaluru , Karnataka",
        "Sheraton Grand Bengaluru , Whitefield, Thigalarapaiya , Bengaluru , Karnataka",
        "KSR Bengaluru City Junction , Majestic , Bengaluru , Karnataka "
    ]
    return (
        <div>
            {
                locations.map(function (elem,idx) {
                    return <div key={idx} onClick={() => {
                        props.setVehiclePanel(true)
                        props.setIsPanelOpen(false)
                    }} className='flex gap-2  active:bg-gray-400 mx-2 py-1  border-2 border-gray-200 rounded-xl  items-center my-4 justify-start'>
                        <h2 className='bg-[#eee] ml-2 h-8 flex items-center justify-center w-12 rounded' > <FontAwesomeIcon icon={faLocationDot} /></h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                })
            }
        </div >
    )
}
