const express = require('express'); 
const validateToken = require('../middlewares/validateTokenHandler.js');
const {
    registerUser,
    loginUser,
    currentUser
} = require('../controllers/usersController.js');

const router = express.Router(); 

router.route('/register').post(registerUser)
router.route('/login').post(loginUser) 
router.route('/current').get(validateToken, currentUser);

module.exports = router;