const express= require('express');
const router= express.Router();
const {body} = require("express-validator");
const controller = require("../controllers/user.controller.js");



router.post('/register',
    [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('password must be atleast 6 characters long')
    ] 
, controller.registeruser)


router.post('/login', [
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min:6}).withMessage('password must be of minimum length 6')
], controller.loginuser)



module.exports=router;