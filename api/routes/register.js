const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register');

const commonstudentsController = require('../controllers/commonstudents');

router.post('/register',
    registerController.validateRegister()
    , registerController.register);


router.get('/commonstudents',
    commonstudentsController.validateRegister(),
    commonstudentsController.register);

module.exports = router;