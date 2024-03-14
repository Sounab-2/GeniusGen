const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt =require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 5,
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate:{
            validator: validator.isEmail,
            message: 'Please provide valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength:6,
    },
    role:{
        type: String,
        enum: ['admin','user'],
        default: 'user',
    }
})

//Hashed the Password
UserSchema.pre('save',async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

UserSchema.methods.comparePassword = async function (userPassword){
    const isMatch = await bcrypt.compare(userPassword,this.password);
    return isMatch;
}

const User = mongoose.model('User',UserSchema);

User.createIndexes();

module.exports = User;