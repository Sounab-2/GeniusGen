// const mongoose = require('mongoose');

// const connectDB = (url) => {
//   return mongoose.connect(url);
// };

// module.exports = connectDB;


// const mongoose = require('mongoose');

// // // Fix Mongoose deprecation warning
//  mongoose.set('strictQuery', false);

// const connectDB = async (url) => {
//   try {
//     await mongoose.connect(url, {
//       useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useCreateIndex: true
//     });
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message);
//     throw error; // Rethrow the error for better error handling in the calling code
//   }
// };

// module.exports = connectDB;

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

