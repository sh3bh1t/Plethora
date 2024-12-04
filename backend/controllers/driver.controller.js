const blacklistToken = require('../models/blacklistToken.model.js');
const Driver=require('../models/driver.model.js');
const {validationResult}=require('express-validator');

module.exports.registerDriver= async(req,res,next) =>{
    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const {fullname,email,vehicle,password}=req.body;
    const driverAlreadyExists = await Driver.findOne({email});
    if(driverAlreadyExists){
        return res.status(400).json({ message : 'driver already exists'});
    }

    const driver = new Driver({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname,
        },
        email,
        password,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
        }
    });
    driver.password = await driver.hashPassword(password);

    await driver.save();
    const token= await driver.generateAuthToken();

    res.status(201).json({token,driver});
}


module.exports.loginDriver= async(req,res,next)=>{

    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email,password}= req.body;
    const driver = await Driver.findOne({email}).select('+password');

    if(!driver){
        return res.status(400).json({message: 'driver does not exist'});
    }

    const isMatch = await driver.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({message : ' invalid email or password'}) ;
    }

    const token = await driver.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({token, driver});
}

module.exports.getDriverProfile = async(req,res,next) =>{
    res.status(200).json(req.driver);
}


module.exports.logoutDriver = async(req,res,next) =>{
    const token = res.cookie?.token || (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null);
    await blacklistToken.create({token});
    res.clearCookie('token');


    res.status(200).json({message: 'logged out'});
}