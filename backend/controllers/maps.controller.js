const mapService=require('../services/maps.service.js');
const {validationResult} = require('express-validator');


module.exports.getCoordinates= async(req,res,next)=>{
    
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const {address}=req.query;
    try{
        const coordinates= await mapService.getAddressCoordinate(address)
        res.status(200).json(coordinates);
    }catch(err){
        res.status(404).json({message:'coordinates not found'});
    }
}


module.exports.getDistanceTime= async(req,res,next)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const {origin,destination}=req.query;


    try{
        const distanceTime= await mapService.getDistanceTime(origin,destination);
        res.status(200).json(distanceTime);
    }catch(err){
        res.status(400).json({message:'distance cant be found'})
    }
}


module.exports.getAutoCompleteSuggestions = async(req,res,next)=>{
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const {input}=req.query;

    try{
        const suggestions= await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    }catch(err){
        res.status(400).json({message:'suggestions not found'});
    }
}
