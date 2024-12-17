const rideSerive = require('../services/ride.service.js');
const {validationResult} = require('express-validator');

module.exports.createRide = async(req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const {userId, pickup , destination , vehicleType} = req.body;
    try{
        const ride= await rideSerive.createRide({user : req.user._id , pickup , destination , vehicleType});
        return res.status(200).json(ride);
    }catch(err){
        return res.status(400).json({message : err.message})
    }
}

module.exports.getFare= async(req,res)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const {pickup,destination}=req.query;
    try{
        const fare= await rideSerive.getfare(pickup,destination);
        res.status(200).json(fare);
    }catch(err){
        res.status(400).json({message:err.message});
    }
}