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
    const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings });
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

module.exports = {search};
