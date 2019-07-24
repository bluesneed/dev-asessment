const teacherModel = require('../../models').teacher;
const studentModel = require('../../models').student;
const registrationModel = require('../../models').registration;
const sequelize = require('../../models/index').sequelize;
const errorResponse = require('./ErrorResponse');
const {body, header} = require('express-validator');
const {validationResult} = require('express-validator');
const customValidator = require('./customValidator');

module.exports = {
    validateRegister() {
        return [
            header('content-type', 'Content-type must be JSON').equals("application/json"),
            body('teacher', 'Please specify teacher field.').exists(),
            body('teacher', 'Teacher is not valid email.').isEmail(),
            body('students', 'Students must be array',).isArray(),
            body('students', 'Students must not be empty',).custom(customValidator.validateArrayNotEmpty),
            body('students', 'Some of the Students are not valid emails').custom(customValidator.validateEmailArray)
        ]
    }
    ,
    register(req, res, next) {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
        if (!errors.isEmpty()) {
            const formattedString = formatError(errors)
            res.status(422).json({message: formattedString});
            return;
        }
        const teacherEmail = req.body.teacher;
        const theTeacher = {
            email: teacherEmail
        };

        const studentEmailArray = req.body.students;
        const theStudents = [];
        studentEmailArray.forEach(studentEmail => {
            theStudents.push({email: studentEmail})
        });
        sequelize.transaction().then(tran => {
            return insertTeacherIfNotExist(theTeacher, tran)
                .then(function () {
                        console.log('>>>>>>  insertStudentIfNotExist');
                        return insertStudentIfNotExist(theStudents, tran)
                    }
                )
                .then(function () {
                    console.log('>>>>>>  insertRegisrationIfNotExist');
                    return insertRegisrationIfNotExist(theTeacher, theStudents, tran);
                })
                .then(function () {
                        console.log('>>>>>>  commit');
                        tran.commit();
                        res.status(204).json({msg: "success"})
                    }
                )
                .catch(error => {
                    tran.rollback();
                    res.status(400).json({msg: error})
                })

        })

    }
};


function formatError(errors) {
    let formattedString = '';
    errors.array().forEach((value, index, array) => {
        formattedString = formattedString + value.msg
        if (index !== array.length - 1) {
            formattedString = formattedString + '|'
        }
    });
    return formattedString
}

function insertTeacherIfNotExist(teacher, tran) {
    return teacherModel
        .findByPk(teacher.email)
        .then(obj => {
            if (!obj) {
                // insert
                return teacherModel.create(teacher, {transaction: tran});
            }
        })
}


function insertStudentIfNotExist(studentArray, tran) {
    return studentModel.bulkCreate(studentArray,
        {
            ignoreDuplicates: true
        }, {transaction: tran})
}


function insertRegisrationIfNotExist(teacher, studentArray, tran) {
    const teachStudentPair = [];
    studentArray.forEach(student => {
            teachStudentPair.push({
                teacherEmail: teacher.email,
                studentEmail: student.email
            })
        }
    );
    return registrationModel.bulkCreate(teachStudentPair,
        {
            transaction: tran,
            ignoreDuplicates: true
        }
    )
}
