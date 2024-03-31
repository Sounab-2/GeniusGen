const express = require('express');
require('dotenv').config();
require('express-async-errors');
// const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

//Connect Database
const connectDB = require('./db/connect');

//routers
const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const historyRouter = require('./routes/historyRoute');
const aiRouter =  require('./routes/aiRoute');

//middlewares
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(cors({
    // origin: 'http://localhost:5173',
    origin: 'https://genius-gen.vercel.app',
    credentials: true
}));
// Handle preflight requests for all routes
app.options('*', cors());

// Custom middleware to ensure 'Access-Control-Allow-Credentials' header is set
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Add your routes and other middleware here...

app.get('/', (req, res) => {
  res.send('Server is running');
});

// app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get('/', (req,res,next)=>{
    res.send("educational content generator api")
})

app.get('/api/v1', (req,res,next)=>{
    res.send('testing')
    console.log(req.signedCookies);
})

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/history',historyRouter);
app.use('/api/v1/search',aiRouter);
app.use('/api/v1/quiz',aiRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async function() {
    await connectDB(process.env.MONGO_URL);
    try {
        app.listen(port,console.log(`Server is listening on ${port}`));
    } catch (error) {
        console.log(error);
    }
}


start();
