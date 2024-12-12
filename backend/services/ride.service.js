const Ride = require('../models/ride.model');
const mapService = require('./maps.service.js');
const crypto = require('crypto');
module.exports.getfare = async function (pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('pickup and destination are required');
    }

    const DistanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
    };
    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };
    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    }
    const fare = {
        auto: baseFare.auto + ((DistanceTime.distance.value / 1000) * perKmRate.auto) + ((DistanceTime.duration.value / 60) * perMinuteRate.auto),
        car: baseFare.car + ((DistanceTime.distance.value / 1000) * perKmRate.car) + ((DistanceTime.duration.value / 60) * perMinuteRate.car),
        motorcycle: baseFare.motorcycle + ((DistanceTime.distance.value / 1000) * perKmRate.motorcycle) + ((DistanceTime.duration.value / 60) * perMinuteRate.car),
    }

    return fare;
}

module.exports.getOtp = function (num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await this.getfare(pickup, destination);

    const ride = await Ride.create({
        user,
        pickup,
        destination,
        vehicleType,
        otp:this.getOtp(4),
        fare: fare[vehicleType]
    })

    return ride;
}