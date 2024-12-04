const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');


const driverSchema= new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minLength:[ 3 , 'firstname must be atleast 3 letters']
        },
        lastname:{
            type:String,
            minLength:[ 3 , 'firstname must be atleast 3 letters']
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,
    },
    status :{
        type:String,
        enum:['active','inactive'],
        default:'inactive',
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minLength:[3,'color must be atleast 3 characters long']
        },
        plate:{
            type:String,
            required:true,
            minLength:[3,'plate must be atleast 3 characters long']
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'capacity must be atleast 1']
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','motorcycle','auto']
        },
        location:{
            lat:{
                type:Number,
            },
            lng:{
                type:Number,
            }
        }
    }
})


driverSchema.methods.generateAuthToken= function(){
    const token= jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn: '24h'})
    return token;
}

driverSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

driverSchema.methods.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const Driver = mongoose.model('Driver',driverSchema);
module.exports=Driver;
