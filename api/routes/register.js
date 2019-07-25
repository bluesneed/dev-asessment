const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register');

const commonstudentsController = require('../controllers/commonstudents');

const suspendController = require('../controllers/suspend');
const retrievefornotificationsController = require('../controllers/retrievefornotifications');



router.post('/register',
    registerController.validateRegister()
    , registerController.register);


router.get('/commonstudents',
    commonstudentsController.validateRegister(),
    commonstudentsController.register);


router.post('/suspend',
    suspendController.validate(),
    suspendController.suspend);

router.post('/retrievefornotifications',
    retrievefornotificationsController.validate(),
    retrievefornotificationsController.notify);


module.exports = router;