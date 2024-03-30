const { StatusCodes } = require('http-status-codes');
const { createHistory } = require('./historyController'); // Correct import path
const {search} = require('./Gemini');

const searchTopic = async (req, res) => {
    try {
        const userId = req.user.userId;
        const prompt = req.query.Topic;
        const text = await search(prompt);
        getPrompt(prompt)
        res.status(StatusCodes.OK).json({ text, userId });
        await createHistory(prompt, text, userId); 
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    searchTopic,
    search
};
