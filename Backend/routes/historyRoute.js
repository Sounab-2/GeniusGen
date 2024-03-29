const express = require('express');
const router = express.Router();
const {authenticateUser} = require('../middleware/authentication')
const {
        createHistory,getAllHistory,getSingleHistory,savedContent,deleteHistory,regenerateHistory
} = require('../controllers/historyController');

// router.post('/createHistory',authenticateUser,createHistory);
router.get('/getAllHistory',authenticateUser,getAllHistory);
router.get('/saved/:id',authenticateUser,savedContent);
router.get('/:id',authenticateUser,getSingleHistory);
router.delete('/deleteHistory/:id',authenticateUser,deleteHistory);
router.post('/regenerate/:id',authenticateUser,regenerateHistory);


module.exports = router;