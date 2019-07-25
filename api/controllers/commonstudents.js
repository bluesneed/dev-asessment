const registrationModel = require('../../models').registration;

const errorResponse = require('../helper/ErrorResponse');
const {check} = require('express-validator');
const {validationResult} = require('express-validator');
const parser = require('../helper/parser');
const url = require('url');
const qs = require('querystring');
const validator = require("validator");


module.exports = {
    validate() {
        return [
            // query("teacher"," not ok ").isEmail()
        ]
        // return checkSchema({
        //     teacher: {
        //         in: [ 'query'],
        //         errorMessage: 'invalid teacher emails',
        //         optional: false,
        //         isEmail: true
        // ,
        // customSanitizer: {
        //     options: function (value, {req, location, path}) {
        //         // console.log(value);
        //         if (value.constructor !== Array) {
        //             value.trim();
        //             value = validator.normalizeEmail(value);
        //             return value
        //         }else {
        //             value = map(a=> a.trim,validator.normalizeEmail(a))
        //         }
        //         return value;
        //     }
        // }

        // }
        // })
    }
    ,
    register(req, res, next) {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
        if (!errors.isEmpty()) {
            res.status(422).json({message: errorResponse.formatError(errors)});
            return;
        }

        let teachers = [];
        let maybeTeachers = req.query.teacher;
        if (maybeTeachers.constructor !== Array) {
            teachers.push(maybeTeachers)
        } else {
            teachers = maybeTeachers.slice()
        }

        teachers.map(Function.prototype.call, String.prototype.trim);
        teachers.map(Function.prototype.call, String.prototype.toLowerCase);

        teachers.forEach(email => {
            // validate({from: email}, constraints);
            if (!validateEmail(email)) {
                res.status(422).json({message: "all teachers must be email"});
            }

        });


        const uniq = [...new Set(teachers)];


        fetch(req, res, uniq)
    }
}
;

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


fetch = function (req, res, teachers) {
    console.log(teachers);

    return registrationModel
        .findAll({
                where: {teacherEmail: teachers},
                attributes:
                    ['studentEmail']
            }
        ).then(students => {
            if (students) {
                const result = parser.parseGetListEmailArrayByTeacherSize(students, teachers)
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