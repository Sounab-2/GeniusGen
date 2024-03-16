// const History = require('../model/History');
// const {User} = require('../model/User')
// const {StatusCodes} = require('http-status-codes');
// const customError = require('../errors');

// const createHistory = async (req,res)=> {
//     const {title,body} = req.body;

//     if(!title || !body){
//         throw new customError.BadRequestError('Please provide title and body')
//     }
//     const history = await History.create({title,body});
//     // User.history = history;

//     res.status(StatusCodes.CREATED).json({content:history});

// }

// module.exports = {
//     createHistory
// }


const History = require('../model/History');
const  User  = require('../model/User');
const { StatusCodes } = require('http-status-codes');
const customError = require('../errors');

const createHistory = async (req, res) => {
    const { title, body } = req.body;

    if (!title || !body) {
        throw new customError.BadRequestError('Please provide title and body');
    }

    try {
        // Create the history document
        const history = await History.create({ title, body });
        // Find the user by some identifier, e.g., user ID
        const userId = req.user.userId;
        const user = await User.findById({_id : userId})

        if (!user) {
            throw new customError.NotFoundError('User not found');
        }

        // // Push the history document into the user's history array
        user.history.push(history);
        await user.save(); // Save the user document to persist the changes

        // Respond with the created history
        res.status(StatusCodes.CREATED).json({ content: history });
    } catch (error) {
        // Handle any errors
        // You can choose to throw the error to be caught by a middleware or handle it here
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

const getAllHistory = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate('history');
        
        const histories = user.history.map(history => history.toObject());
        res.status(StatusCodes.OK).json({ histories });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};

const getSingleHistory = async (req,res)=> {
    const user = await User.findById(req.user.userId).populate('history');
    const histories = user.history.map(history => history.toObject());
    const contentId = req.params.id;
     // Find the history document that matches the content ID
     const singleHistory = histories.find(history => history._id.toString() === contentId);
     
     if (!singleHistory) {
        throw new customError.NotFoundError('History not found');
    }

    res.status(StatusCodes.OK).json({content: singleHistory});
}

module.exports = {
    createHistory,getAllHistory,getSingleHistory
};
