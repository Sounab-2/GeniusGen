const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middleware/authentication')
const {
        createHistory,getAllHistory,getSingleHistory,savedContent
} = require('../controllers/historyController');

router.post('/createHistory',authenticateUser,createHistory);
router.get('/getAllHistory',authenticateUser,getAllHistory);
router.get('/saved/:id',authenticateUser,savedContent);
router.get('/:id',authenticateUser,getSingleHistory);


module.exports = router;