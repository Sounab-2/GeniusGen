const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const HistoryModel = require('./History'); // Import the History model

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
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    history: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'History', // Reference to the History model
        required:true,
    }]
     // Embedding the History model
});

// UserSchema.path('history').default([]);

// Hash the Password
UserSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
}

const User = mongoose.model('User', UserSchema);

User.createIndexes();

module.exports = User;
