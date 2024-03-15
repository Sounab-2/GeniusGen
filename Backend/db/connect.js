const mongoose = require('mongoose');

const connectDB = async (mongoURI) => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;

