const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('../database/mogoose')

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        unique: true,
    },
    
    email:{
        type: String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },

    password:{
        type: String,
        required: true,
        validate(value){
            if(value.length<7){
                throw new Error('Password cant be less than 8 characters')
            }
        }
    },


    tokens:[{
        token:{
            type: String,
            required: true
        }
    }],

    chats:{
        type: String
    }
})

//hashing the password of user
userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

//generating tokens 
userSchema.methods.generateAuthToken = async function (){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'myNewSocialApp');
    // console.log(token);
    // console.log('d')
    user.tokens = user.tokens.concat({token});
    // console.log('befre save');
    await user.save();
    // console.log('After save')
    // console.log('alldone')
    return token;
}

//new method find by email and password
userSchema.statics.findByCredentials = async function (email, password){
    const user = await User.findOne({email: email});
    if(!user){
        throw new Error("invalid email");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Something went wornd from yourside');
    } 
    return user;
}

//findByUserName
userSchema.statics.findByUserName = async function (userName){
    const user = await User.findOne({name: userName});
    if(!user){
        throw new Error("invalid userName");
    }
    
    return user;
}

const User = mongoose.model('User', userSchema)

module.exports = User;