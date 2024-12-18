const rideSerive = require('../services/ride.service.js');
const { validationResult } = require('express-validator');
const mapservice = require('../services/maps.service.js');
const { sendMessageToSocketId } = require('../socket.js');
const Ride = require('../models/ride.model.js');
module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userId, pickup, destination, vehicleType } = req.body;
    try {
        const ride = await rideSerive.createRide({ user: req.user._id, pickup, destination, vehicleType });

        const pickupCoordinates = await mapservice.getAddressCoordinate(pickup);

        const driversInRadius = await mapservice.getDriversInRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);

        const rideWithUser = await Ride.findById(ride._id)
        .populate('user', 'fullname firstname lastname email') // Populate only the fields you need
        .lean();  

        ride.otp = ""

        driversInRadius.map(driver => {
            sendMessageToSocketId(driver.socketId,
                {
                    event: 'new-ride',
                    data: rideWithUser
                });
        })
        res.status(200).json(rideWithUser);


    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

module.exports.getFare = async (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination } = req.query;
    try {
        const fare = await rideSerive.getfare(pickup, destination);
        res.status(200).json(fare);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}