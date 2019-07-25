const registrationModel = require('../../models').registration;
const errorResponse = require('../helper/ErrorResponse');
const {body} = require('express-validator');
const {validationResult} = require('express-validator');

module.exports = {
    validate() {
        return [
            body('student', 'Please specify student field.').exists(),
            body('student', 'Student is not valid email.').isEmail()]
    }
    ,
    suspend(req, res, next) {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
        if (!errors.isEmpty()) {
            res.status(422).json({message: errorResponse.formatError(errors)});
            return;
        }
        unregister(req, res)
    }
};


const unregister = function (req, res) {
    const studentEmail = req.body.student;
    return registrationModel.destroy({
            where: {studentEmail: studentEmail},
        }
    ).then(() => {
        res.status(204).json()
    })
        .catch(error => {
            res.status(400).json(
                errorResponse.error(error.message))
        })

}