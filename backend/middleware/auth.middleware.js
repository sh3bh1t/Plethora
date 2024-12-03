const User= require('../models/user.model.js');
const jwt= require('jsonwebtoken');
const bcrypt = require('bcrypt');
const blacklistToken = require('../models/blacklistToken.model.js');

module.exports.authUser= async(req,res,next)=>{
    const token= req.cookies?.token ||(req.headers.authorization &&  req.headers.authorization?.split(' ')[1]);

    if(!token){
        return res.status(401).json({message : 'unauthorized'});
    }

    const isBlackListed = await blacklistToken.findOne({token:token});

    if(isBlackListed){
        return res.status(401).json({message : 'unauthorized'});
    }

    try{
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        const user= await User.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user=user;

        return next();
    }
    catch(err){
        return res.status(401).json({message : ' unauthorized'});
    }
}