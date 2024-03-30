    const { StatusCodes } = require('http-status-codes');
    const { search } = require('./Gemini');
    const History = require('../model/History');
    const User = require('../model/User');
    const customError = require('../errors');

    const createHistory = async (title, body, userId) => {
        if (!title || !body) {
            throw new customError.BadRequestError('Please provide title and body');
        }

        try {
            const history = await History.create({ title, body });
            const user = await User.findById(userId);

            if (!user) {
                throw new customError.NotFoundError('User not found');
            }

            user.history.push(history);
            await user.save();

            // Respond with the created history
            return history;
        } catch (error) {
            console.error(error);
            throw new customError.InternalServerError('Internal Server Error');
        }
    };

    const getAllHistory = async (req, res) => {
        try {
            const user = await User.findById(req.user.userId).populate('history');
            const originalHistories = user.history.map(history => history.toObject());
            const histories = originalHistories.slice().reverse();
            res.status(StatusCodes.OK).json({ histories });
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    };

    const getSingleHistory = async (req, res) => {
        try {
            const user = await User.findById(req.user.userId).populate('history');
            const histories = user.history.map(history => history.toObject());
            const contentId = req.params.id;
            const singleHistory = histories.find(history => history._id.toString() === contentId);
            if (!singleHistory) {
                throw new customError.NotFoundError('History not found');
            }
            res.status(StatusCodes.OK).json({ content: singleHistory });
        } catch (error) {
            console.error(error);
            if (error instanceof customError.NotFoundError) {
                res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
            }
        }
    };

    const savedContent = async (req, res) => {
        try {
            const contentId = req.params.id;
            const savedHistory = await History.findById(contentId);
            savedHistory.saved = !savedHistory.saved;
            await savedHistory.save();
            res.status(StatusCodes.OK).json({ content: savedHistory });
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    };

    const deleteHistory = async (req, res) => {
        try {
            const historyId = req.params.id;
            const deletedHistory = await History.findByIdAndDelete(historyId);
            if (!deletedHistory) {
                throw new customError.NotFoundError('History not found');
            }
            res.status(StatusCodes.OK).json({ message: 'History deleted successfully' });
        } catch (error) {
            console.error(error);
            if (error instanceof customError.NotFoundError) {
                res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
            }
        }
    };

    const regenerateHistory = async (req, res) => {
        try {
            const historyId = req.params.id;
            const userId = req.user.userId;
            const history = await History.findById(historyId);
            if (!history) {
                throw new customError.NotFoundError('History not found');
            }
            const text = await search(history.title);
            history.body = text;
            await history.save();
            res.status(StatusCodes.OK).json({ message: 'History regenerated successfully',text, userId });
        } catch (error) {
            console.error(error);
            if (error instanceof customError.NotFoundError) {
                res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
            }
        }
    };

    module.exports = {
        createHistory,
        getAllHistory,
        getSingleHistory,
        savedContent,
        deleteHistory,
        regenerateHistory
    };
