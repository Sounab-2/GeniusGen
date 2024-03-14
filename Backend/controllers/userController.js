const User = require('../model/User');
const {StatusCodes} = require('http-status-codes');
const customError = require('../errors');
const { compare } = require('bcryptjs');


const getAllUsers = async (req,res) => {
    console.log(req.user);
    const users = await User.find({role: 'user'}).select('-password');
    res.status(StatusCodes.OK).json({users});

}
const getSingleUser = async (req,res) => {
    const user = await User.findById({_id: req.params.id}).select('-password');
    if(!user){
        throw new customError.NotFoundError(`No User with id:${req.params.id} found`);
    }
    res.status(StatusCodes.OK).json({user});
}
const showCurrentUser = async (req,res) => {
   const user = req.user;
   if(user){
    res.status(StatusCodes.OK).json({user});
   }
}
const updateUser = async (req,res) => {
    res.send('Update current user ');
}

const updateUserPassword = async (req,res) => {
    const {oldPassword,newPassword} = req.body;

   if(!oldPassword || !newPassword){
    throw new customError.BadRequestError('Please provide both values');
   }

   const user= await User.findOne({_id: req.user.userId});
   
   const isPasswordCorrect = await user.comparePassword(oldPassword);
    
   if(!isPasswordCorrect) {
    throw new customError.UnauthenticatedError('Invalid credentials');
   }

   user.password = newPassword;
   await user.save();
   res.status(StatusCodes.OK).json({msg: "Password updated successfully"})

}

module.exports = {
    getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword,
}
