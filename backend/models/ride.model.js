const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    driver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Driver'
    },
    pickup:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    vehicleType:{
        type:String,
        enum:['auto','motorcycle','car'],
        required:true,
    },
    fare:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:['pending','accepted','ongoing','completed','cancelled'],
        default:'pending'
    },
    duration:{
        type:Number,
    },
    distance:{
        type:Number,
    },
    paymentId:{
        type:String,
    },
    orderId:{
        type:String,
    },
    signature:{
        type:String,
    },
    otp:{
        type:String,
        select:false,
        required:true,
    }
})

const Ride=mongoose.model("Ride",rideSchema);
module.exports=Ride;