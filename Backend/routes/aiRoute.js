const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middleware/authentication')

const {
        searchTopic
} = require('../controllers/aiController');

const {
        getQuiz
}=require('../controllers/quizcontroller');

router.post('/',authenticateUser,searchTopic);
router.get('/',authenticateUser,getQuiz)

module.exports = router;