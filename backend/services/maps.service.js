const axios = require('axios');
const Driver = require('../models/driver.model.js');
module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {

    if (!origin || !destination) {
        throw new Error("both origin and destination are required");
    }

    const apikey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apikey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.rows[0].elements[0];
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports.getAutoCompleteSuggestions = async(input)=>{
    if(!input){
        throw new Error('Some query address is required');
    }

    const apiKey= process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            return response.data.predictions;
        }else{
            throw new Error('unable to fetch suggestions');
        }
    }catch(err){
        console.error(err);
        throw err;
    }
}

module.exports.getDriversInRadius = async(ltd,lng,radius)=>{
    const drivers = await Driver.find({
        location:{
            $geoWithin:{
                $centerSphere:[[ltd,lng],radius/6378.1]
            }
        }
    });
    return drivers;
}
