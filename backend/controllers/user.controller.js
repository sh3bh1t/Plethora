const User = require('../models/user.model.js');
const userService = require('../services/user.service.js');
const { validationResult } = require('express-validator');

module.exports.registeruser = async (req, res, next) => {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    //console.log(req.body);

    const { fullname, email, password } = req.body;
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