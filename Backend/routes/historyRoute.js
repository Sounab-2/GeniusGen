const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middleware/authentication')
const {
        createHistory
} = require('../controllers/historyController');

router.post('/createHistory',authenticateUser,createHistory);


module.exports = router;