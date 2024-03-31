const { StatusCodes } = require('http-status-codes');
const {setQuiz,setLink} = require('./Gemini');
const History = require('../model/History');

const getQuiz = async (req, res) => {
    try {
            const historyId = req.params.id;
            const history = await History.findById(historyId);
            if (!history) {
                throw new customError.NotFoundError('History not found');
            }

            const text = await setQuiz(history.title);

        // Parse string to JavaScript object array
        const questions = eval('(' + text + ')');

        res.status(StatusCodes.OK).json({ mcqQuestions: questions });
    } catch (error) {
        console.error('Error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

const getLink =async (req, res) => {
    try {
        const historyId = req.params.id;
        const history = await History.findById(historyId);
        if (!history) {
            throw new customError.NotFoundError('History not found');
        }

        const link = await setLink(history.title);

    res.status(StatusCodes.OK).json({ link });
} catch (error) {
    console.error('Error:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
}
}

module.exports = {
    getQuiz,getLink}

