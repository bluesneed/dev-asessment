const registrationModel = require('../../models').registration;

const errorResponse = require('../helper/ErrorResponse');
const {query} = require('express-validator');
const {validationResult} = require('express-validator');
const parser = require('../helper/parser');
const url = require('url');
const qs = require('querystring');


module.exports = {
    validateRegister() {
        return [
            query('teacher', 'Please specify teacher field.').exists(),
            query('teacher', 'Teacher is not valid email.').trim()]
    }
    ,
    register(req, res, next) {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
        if (!errors.isEmpty()) {
            res.status(422).json({message: errorResponse.formatError(errors)});
            return;
        }
        fetch(req, res)
    }
};


fetch = function (req, res) {
    const arg = url.parse(req.url).query;
    const teachers = qs.parse(arg)['teacher'];
    console.log(teachers);

    return registrationModel
        .findAll({
                where: {teacherEmail: teachers},
                attributes:
                    ['studentEmail']
            }
        ).then(students => {
            if (students) {

                const result = parser.parseGetListEmailArrayByTeacherSize(students,  teachers)
                res.status(200).json({
                    "students": result
                });
            } else {
                res.status(400).json(errorResponse.error("Not Found"))
            }

        })
        .catch(error => {
            res.status(400).json(
                errorResponse.error(error.message))
        })
}