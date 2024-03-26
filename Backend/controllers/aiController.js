const { StatusCodes } = require('http-status-codes');
const { GoogleGenerativeAI,HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const {createHistory} = require('./historyController');
const {getPrompt} = require('./quizcontroller');

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

const searchTopic = async (req, res) => {
    try {
        const userId = req.user.userId;
        const model = genAI.getGenerativeModel({ model: "gemini-pro" ,safetySettings});
        const prompt = req.query.Topic; // Access topic from query parameters
        // console.log(prompt);
        getPrompt(prompt);
        const modifiedPrompt = `Check if the given ${prompt} is directly related to programming or computer science.
        If the ${prompt} is not related to programming or computer science, provide a JSON object message indicating that the topic is not related to programming or computer science and suggest searching for related topics in computer science.
        Otherwise, generate an educational piece on ${prompt} in programming/computer science.
        Explain its definition, fundamental concepts, and its relevance in the field.
        Provide examples to illustrate real-world applications and discuss common operations, algorithms, or techniques associated with ${prompt}.
        Explore its relationship with other related topics or data structures and highlight best practices and potential challenges.
        Include detailed explanations, code snippets (default in C language), and practical examples to enhance understanding.
        Conclude with recommendations for further study or related topics to explore.
        Ensure the content is accessible and informative for learners at various levels of expertise.
        structure of json object will be like this:
        const isRelatedMessage = {
            related: false/true,
            message: The given prompt is not related to programming or computer science. Please search for related topics in computer science.,
            suggestions: {"Data Structure","Machine Learning"}
        }
        `;
    
        // Use streaming with text-only input
        const result = await model.generateContentStream(modifiedPrompt);
        let text = '';
        for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        // console.log(chunkText);
        text += chunkText;
        }

        res.status(StatusCodes.OK).json({ text,userId }); // Send response as JSON object
        createHistory(prompt,text,userId);

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}

// const getPrompt = (prompt)=>{
//   console.log(prompt);
//   return prompt;
// }

module.exports = {
    searchTopic,getPrompt,
   
}
