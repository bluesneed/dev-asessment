const registrationModel = require('../../models').registration;

const errorResponse = require('./ErrorResponse');
const { query} = require('express-validator');
const {validationResult} = require('express-validator');
const customValidator = require('./customValidator');

module.exports = {
    validateRegister() {
        return [
            query('teacher', 'Please specify teacher field.').exists(),
            query('teacher', 'Teacher is not valid email.').isEmail()]
    }
    ,
    register(req, res, next) {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
        if (!errors.isEmpty()) {
            res.status(422).json({message: errors.array()});
            return;
        }
        fetch(req, res)
    }
};


fetch = function (req, res) {
    const teachers = req.query.teacher;

    return registrationModel
        .findAll({
                where: {teacherEmail: teachers},
                attributes:
                    ['studentEmail']
            }
        ).then(students => {
            if (students) {
                const result = Array.from(new Set(students.map(a => a.studentEmail)))
                    .map(email => {
                        return students.find(a => a.studentEmail === email)
                    }).map(a => a.studentEmail);
                res.status(200).json({

                    "students": result
                })
            } else {
                res.status(400).json(errorResponse.error("Not Found"))
            }

        })
        .catch(error => {
            res.status(400).json(
                errorResponse.error(error.message))
        })
}