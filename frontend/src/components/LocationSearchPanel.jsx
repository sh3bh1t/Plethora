import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

export const LocationSearchPanel = ({ suggestions, setIsPanelOpen, setVehiclePanel, onSelect }) => {
  return (
    <div>
      {suggestions.map((elem, idx) => (
        <div
          key={idx}
          onClick={() => {
            onSelect(elem);  // Pass the suggestion directly
            // setVehiclePanel(true);
            // setIsPanelOpen(false);
          }}
          className='flex gap-2 active:bg-gray-400 py-1 border-2 border-gray-200 rounded-xl my-4 mx-3 items-center justify-start'
        >
          <h2 className='bg-[#eee] ml-2 h-8 flex items-center justify-center w-12 rounded'>
            <FontAwesomeIcon icon={faLocationDot} />
          </h2>
          <h4 className='font-medium'>{elem.description}</h4> {/* Assuming the description is what you want to show */}
        </div>
      ))}
    </div>
  );
};
