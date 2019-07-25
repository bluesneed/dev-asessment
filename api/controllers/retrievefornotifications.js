const registrationModel = require('../../models').registration;
const errorResponse = require('../helper/ErrorResponse');
const {body} = require('express-validator');
const {validationResult} = require('express-validator');
const parser = require('../helper/parser');
const validator = require('validator');

module.exports = {
    validate() {
        return [
            body('teacher', 'Please specify teacher field.').exists(),
            body('teacher', ' Teacher field must be email').trim().isEmail().normalizeEmail(),
            body('notification', "One or some of the students are not valid email ").customSanitizer(value => {
                const splited = value.split(" @");
                const obj = {
                    message: "",
                    students: []
                };
                splited.forEach((value, index) => {
                    if (index === 0) {
                        obj.message = value.trim()
                    } else {
                        value = validator.trim(value);
                        value = value.toLowerCase();
                        obj.students.push({studentEmail: value})
                    }
                });
                return obj;
            }).custom(value =>{
                console.log(value);
                value.students.forEach(student =>{
                  if(!validator.isEmail(student.studentEmail)){
                      throw Error()
                  }
                })
                return true
            })
        ]
    }
    ,
    notify(req, res, next) {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
        if (!errors.isEmpty()) {
            res.status(422).json({message: errorResponse.formatError(errors)});
            return;
        }
        notify(req, res)
    }
};


const notify = function (req, res) {
    const teacherEmail = req.body.teacher;
    const notification = req.body.notification;


    return registrationModel.findAll({
            where: {teacherEmail: teacherEmail},
            attributes:
                ['studentEmail']
        }
    ).then((outcome) => {
        notification.students.forEach((value) => {
                outcome.push(value)
        });
        const result = parser.parseStudentListToEmailArray(outcome);
        res.status(200).json({
            recipients : result
        })
    })
        .catch(error => {
            res.status(400).json(
                errorResponse.error(error.message))
        })

}