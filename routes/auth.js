const express = require('express');
const router = express.Router();



/////////////Controllers Import////////////
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');



////////////Route Management////////////////
router.post('/login', loginController.login);
router.post('/register', registerController.register);

//export router
module.exports = router;