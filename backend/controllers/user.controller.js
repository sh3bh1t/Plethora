const User = require('../models/user.model.js');
const userService = require('../services/user.service.js');
const { validationResult } = require('express-validator');
const blacklistToken= require('../models/blacklistToken.model.js');

module.exports.registeruser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //console.log(req.body);

    const { fullname, email, password } = req.body;

    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists){
        return res.status(400).json({ message : 'user already exists'});
    }

    if (!fullname || !fullname.firstname || !fullname.lastname || !email || !password) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const user = new User({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname,
        },
        email,
        password
    });
    user.password = await user.hashPassword(password);
    await user.save();

    const token = await user.generateAuthToken();
    res.status(201).json({ token, user });
}

module.exports.loginuser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(404).json({ message: 'invalid email or password' });
    }

    // console.log('Password from request:', password);
    // console.log('Password stored in DB:', user.password);

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(404).json({ message: ' invalid email or password' });
    }
    const token = user.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({ user, token });
}

module.exports.getUserProfile= async(req,res,next)=>{
    res.status(200).json(req.user);
}

module.exports.logoutUser = async(req,res,next)=>{
    const token= req.cookies?.token || (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null);
    await blacklistToken.create({token});
    res.clearCookie('token');


    res.status(200).json({message : 'logged out'});
}