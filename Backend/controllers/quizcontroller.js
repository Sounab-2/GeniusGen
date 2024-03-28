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
        Don't give any kind of signs or spaces only the content and don't need to add any question number. Structly follow the demo of the response given.
                  A demo of response is given below:

                  questions: [
                    {
                      question: 'Which function is used to serialize an object into a JSON string in Javascript?',
                      choices: ['stringify()', 'parse()', 'convert()', 'None of the above'],
                      correctAnswer: 'stringify()',
                    },
                    {
                      question: 'Which of the following keywords is used to define a variable in Javascript?',
                      choices: ['var', 'let', 'var and let', 'None of the above'],
                      correctAnswer: 'var and let',
                    },
                 ]
                  `;

        const result = await model.generateContentStream(modifiedPrompt);
        let text = '';
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            text += chunkText;
        }

        // Remove unnecessary parts
        const startIdx = text.indexOf('[');
        const endIdx = text.lastIndexOf(']');
        const jsonText = text.substring(startIdx, endIdx + 1);
        
        return jsonText;
    } catch (error) {
        console.log(error);
    }
}

const getQuiz = async (req, res) => {
    try {
        const text = await setQuiz();

        // Parse string to JavaScript object array
        const questions = eval('(' + text + ')');

        res.status(StatusCodes.OK).json({ mcqQuestions: questions });
    } catch (error) {
        console.error('Error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

module.exports = {
    getPrompt,
    getQuiz
}












// const { StatusCodes } = require('http-status-codes');
// const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// let prompt;

// const safetySettings = [
//     {
//         category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//         threshold: HarmBlockThreshold.BLOCK_NONE,
//     },
//     {
//         category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//         threshold: HarmBlockThreshold.BLOCK_NONE,
//     },
//     {
//         category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//         threshold: HarmBlockThreshold.BLOCK_NONE,
//     },
//     {
//         category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//         threshold: HarmBlockThreshold.BLOCK_NONE,
//     },
// ];

// const getPrompt = (topicPrompt) => {
//     prompt = topicPrompt;
// }

// const setQuiz = async () => {
//     try {
//         if (!prompt) {
//             throw new Error('Prompt is missing');
//         }

//         const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings });
//         const modifiedPrompt = `Generate 10 multiple-choice questions (MCQs) on ${prompt}
//         Ensure that all property names are enclosed in double quotation marks.
//         Make sure that each key-value pair is separated by a comma.
//         Check that all opening curly braces { have a corresponding closing curly brace }.
//         Verify that strings are properly enclosed in double quotation marks.
//         Don't give any kind of signs or spaces only the content and don't need to add any question number. Structly follow the demo of the response given.
//                   A demo of response is given below:

//                   questions: [
//                     {
//                       question: 'Which function is used to serialize an object into a JSON string in Javascript?',
//                       choices: ['stringify()', 'parse()', 'convert()', 'None of the above'],
//                       correctAnswer: 'stringify()',
//                     },
//                     {
//                       question: 'Which of the following keywords is used to define a variable in Javascript?',
//                       choices: ['var', 'let', 'var and let', 'None of the above'],
//                       correctAnswer: 'var and let',
//                     },
//                  ]
//                   `;

//         const result = await model.generateContentStream(modifiedPrompt);
//         let text = '';
//         for await (const chunk of result.stream) {
//             const chunkText = chunk.text();
//             text += chunkText;
//         }

//         // text = text.replace(/\\/g, '');
//         // const jsonText = JSON.parse(text);
//         // console.log(text);
//         return text;
//     } catch (error) {
//         // throw new Error(`${error.message}`);
//         console.log(error);
//     }
// }

// const getQuiz = async (req, res) => {
//     try {
//         const text = await setQuiz();
//         // console.log('Parsed Questions:', text);

//         res.status(StatusCodes.OK).json({ mcqQuestions: text });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
//     }
// }

// module.exports = {
//     getPrompt,
//     getQuiz
// }


