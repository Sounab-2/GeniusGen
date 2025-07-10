const { StatusCodes } = require('http-status-codes');
const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


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

const search = async (topic) => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro", safetySettings });
    const modifiedPrompt = `Check if the given ${topic} is directly related to programming or computer science but don't write it is related to programming or computer science in the response.
        If the ${topic} is not directly related to programming or computer science, provide null.
        Otherwise, generate an educational piece on ${topic} in programming/computer science.
        Explain its definition, fundamental concepts, and its relevance in the field.
        Provide examples to illustrate real-world applications and discuss common operations, algorithms, or techniques associated with ${topic}.
        Explore its relationship with other related topics or data structures and highlight best practices and potential challenges.
        Include detailed explanations, code snippets (default in C language), and practical examples to enhance understanding.
        Conclude with recommendations for further study or related topics to explore.
        Ensure the content is accessible and informative for learners at various levels of expertise.`;

    const result = await model.generateContentStream(modifiedPrompt);
    let text = '';
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        text += chunkText;
    }

    return text;
}


const setQuiz = async (topic)=> {
    try{    
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro", safetySettings });
        const modifiedPrompt = `Generate 10 multiple-choice questions (MCQs) on ${topic}
        Ensure that all property names are enclosed in double quotation marks.
        Make sure that each key-value pair is separated by a comma.
        Check that all opening curly braces { have a corresponding closing curly brace }.
        Verify that strings are properly enclosed in double quotation marks.
        Don't give any kind of signs or spaces only the content and don't need to add any question number. Structly follow the demo of the response given.
        Strictly give 4 choices for each question
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

const setLink = async (topic) => {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro", safetySettings });
    const modifiedPrompt = `Search the ${topic} on Internet and provide the best resource link found for this ${topic}. The link should be a direct link to that resource page.Only give the link nothing else should be specified.`;
    

    const result = await model.generateContent(modifiedPrompt);
  
    return result;
};

module.exports = {search,setQuiz,setLink};
