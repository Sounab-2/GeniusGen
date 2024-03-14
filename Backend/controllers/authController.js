const User = require('../model/User');
const {StatusCodes}= require('http-status-codes');
const customError = require('../errors');
const {attachCookiesToResponse} = require('../utils');
const { token } = require('morgan');

const register = async (req,res) => {
    const {email,name,password} = req.body;
    // Checking if the email is already used or not
    const emailAlreadyExists =await User.findOne({email});
    if(emailAlreadyExists){
        throw new customError.BadRequestError('Email is already in use')
    }

    //Creating user by providing name,email and password so that if any user provides the role as admin...it will be denied
    const user = await User.create({name,email,password});
    const tokenUser = {name: user.name, userId: user._id, role: user.role};
    attachCookiesToResponse({res,user: tokenUser})
    res.status(StatusCodes.CREATED).json({user: tokenUser});
};

const login = async (req,res) => {
    const {email , password} = req.body;

    if(!email || !password){
        throw new customError.BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({email});
    if(!user) {
        throw new customError.UnauthenticatedError('Invalid credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect){
        throw new customError.UnauthenticatedError('Invalid credentials'); 
    }

    const tokenUser = {name: user.name, userId: user._id, role: user.role};
    attachCookiesToResponse({res,user: tokenUser})
    res.status(StatusCodes.CREATED).json({user: tokenUser});
}
const logout = async (req,res) => {
    res.cookie('token','logout',{
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.send('user logged out');
}


module.exports = {
    register,
    login,
    logout,
}