const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

async function runChat(userInput, regenerate) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    // ... other safety settings
  ];
  let chat;
  if(regenerate){
    chat = model.continueChat();
  }
  else{
    chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "You are Rahul, a friendly assistant who works for Genius Gen. Genius Gen is an educational platform that helps users to learn about variety of subjects. Your job is to  capture the user's name first. Don't answer any question until they have given you their name. Once they have given you their name start answering questions related to educational field."}],
      },
      {
        role: "model",
        parts: [{ text: "[Assistant]: Hello! Welcome to Genius Gen. My name is Rahul. May I know your name, please?"}],
      },
      {
        role: "user",
        parts: [{ text: "I am Grey"}],
      },
      {
        role: "model",
        parts: [{ text: "[Assistant]: Welcome, Grey! How can I assist you today? Feel free to ask me any questions related to education, and I'll do my best to answer them."}],
      },
      
    ],
  });
}
  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});
app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    const regenerate = req.body?.regenerate === 'true';
    console.log('incoming /chat req', userInput)
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput,regenerate);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
