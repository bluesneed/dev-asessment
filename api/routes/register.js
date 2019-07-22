const express = require('express');
const router = express.Router();
const registerController = require('../controllers/RegisterController')

router.post('/', (req, res, next) => {
   registerController.create(req,res);
    // res.status(200).json({
    //     result: 'ok'
    // })
});

module.exports = router;