const express= require('express');
const router= express.Router();
const {body,query} = require('express-validator');
const ridecontroller = require('../controllers/ride.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({min:3}).withMessage('invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('invalid destination addresss'),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage('invalid vehicle request'),
    ridecontroller.createRide
)

router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('invalid pickup address'),
    query('destination').isString().isLength({min:3}).withMessage('invalid destination addresss'),
    ridecontroller.getFare
)

router.post('/confirm',
    authMiddleware.authDriver,
    body('rideId').isMongoId().withMessage('invalid ride id'),
    ridecontroller.confirmRide
)

router.get('/start-ride',
    authMiddleware.authDriver,
    query('rideId').isMongoId().withMessage('invalid ride id'),
    query('otp').isString().isLength({min:4}).withMessage('invalid otp'),
    ridecontroller.startRide
)

module.exports=router;