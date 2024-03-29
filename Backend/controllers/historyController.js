const History = require('../model/History');
const  User  = require('../model/User');
const { StatusCodes } = require('http-status-codes');
const customError = require('../errors');

// const createHistory = async (req, res) => {
//     const { title, body } = req.body;

//     if (!title || !body) {
//         throw new customError.BadRequestError('Please provide title and body');
//     }

//     try {
//         // Create the history document
//         const history = await History.create({ title, body });
//         // Find the user by some identifier, e.g., user ID
//         const userId = req.user.userId;
//         const user = await User.findById({_id : userId})

//         if (!user) {
//             throw new customError.NotFoundError('User not found');
//         }

//         // // Push the history document into the user's history array
//         user.history.push(history);
//         await user.save(); // Save the user document to persist the changes

//         // Respond with the created history
//         res.status(StatusCodes.CREATED).json({ content: history });
//     } catch (error) {
//         // Handle any errors
//         // You can choose to throw the error to be caught by a middleware or handle it here
//         console.error(error);
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
//     }
// };

const createHistory = async (title,body,userId) => {
    
    if (!title || !body) {
        throw new customError.BadRequestError('Please provide title and body');
    }

    try {
        // Create the history document
        const history = await History.create({ title, body });
        // Find the user by some identifier, e.g., user ID
        const user = await User.findById({_id : userId})

        if (!user) {
            throw new customError.NotFoundError('User not found');
        }

        // // Push the history document into the user's history array
        user.history.push(history);
        await user.save(); // Save the user document to persist the changes

        // Respond with the created history
        // res.status(StatusCodes.CREATED).json({ content: history });
    } catch (error) {
        // Handle any errors
        // You can choose to throw the error to be caught by a middleware or handle it here
        console.error(error);
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
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

const savedContent = async (req,res)=> {
    const contentId = req.params.id;
    const savedHistory = await History.findById({_id:contentId});
    savedHistory.saved = !savedHistory.saved;
    await savedHistory.save();
     res.status(StatusCodes.OK).json({content: savedHistory});

}

const deleteHistory = async(req,res)=>{
    
        try {
            const historyId = req.params.id;
            const deletedHistory = await History.findByIdAndDelete(historyId);
    
            if (!deletedHistory) {
                throw new customError.NotFoundError('History not found');
            }
    
            const user = await User.findById(req.user.userId);
            user.history = user.history.filter(history => history.toString() !== historyId);
            await user.save();
    
            res.status(StatusCodes.OK).json({ message: 'History deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    };



module.exports = {
    createHistory,getAllHistory,getSingleHistory,savedContent,deleteHistory
};
