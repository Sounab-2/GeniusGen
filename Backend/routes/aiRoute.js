const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middleware/authentication')

const {
        searchTopic
} = require('../controllers/aiController');

const {
        getQuiz, getLink
}=require('../controllers/quizcontroller');

router.post('/',authenticateUser,searchTopic);
router.get('/:id',authenticateUser,getQuiz);
router.get('/link/:id',authenticateUser,getLink);

module.exports = router;