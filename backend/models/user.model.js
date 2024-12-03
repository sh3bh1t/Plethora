const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname :{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'first name must be atleast 3 letters']
        },
        lastname:{
            type:String,
            minlength:[3,'last name must be atleast 3 letters']
        },
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
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn : '24h'});
    return token;
}

userSchema.methods.comparePassword= async function (password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.hashPassword= async function (password){
    return await bcrypt.hash(password,10);
}

const User= mongoose.model('User', userSchema);
module.exports=User;