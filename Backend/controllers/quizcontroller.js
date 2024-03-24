const { StatusCodes } = require('http-status-codes');
const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

let prompt;

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
];

const getPrompt = (topicPrompt) => {
    prompt = topicPrompt;
}

const setQuiz = async () => {
    try {
        if (!prompt) {
            throw new Error('Prompt is missing');
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings });
        const modifiedPrompt = `Generate 10 multiple-choice questions (MCQs) on ${prompt}
        Ensure that all property names are enclosed in double quotation marks.
        Make sure that each key-value pair is separated by a comma.
        Check that all opening curly braces { have a corresponding closing curly brace }.
        Verify that strings are properly enclosed in double quotation marks.
        Don't give any kind of signs or spaces only the content
                  A demo of response is given below:
                  {"MCQs": [
                      {
                        "question": "What is a linked list in data structures?",
                        "options": {
                          "A": "A linear data structure that stores data in a sequential manner",
                          "B": "A non-linear data structure that stores data in a hierarchical manner",
                          "C": "A dynamic data structure that stores data in a non-sequential manner",
                          "D": "A static data structure that stores data in a fixed size array"
                        },
                        "answer": "C"
                      },
                    ]
                  }
                  `;

        const result = await model.generateContentStream(modifiedPrompt);
        let text = '';
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            text += chunkText;
        }

        text = text.replace(/\\/g, '');
        const jsonText = JSON.parse(text);
        // console.log(jsonText);
        return jsonText;
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}

const getQuiz = async (req, res) => {
    try {
        const text = await setQuiz();
        // console.log('Parsed Questions:', text);

        res.status(StatusCodes.OK).json({ mcqQuestions: text });
    } catch (error) {
        console.error('Error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

module.exports = {
    getPrompt,
    getQuiz
}
