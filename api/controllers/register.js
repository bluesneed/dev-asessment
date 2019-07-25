const teacherModel = require('../../models').teacher;
const studentModel = require('../../models').student;
const registrationModel = require('../../models').registration;
const sequelize = require('../../models/index').sequelize;
const errorResponse = require('../helper/ErrorResponse');
const {body, header} = require('express-validator');
const {validationResult} = require('express-validator');
const customValidator = require('../helper/customValidator');

module.exports = {
    validateRegister() {
        return [
            body('teacher', 'Please specify teacher field.').exists(),
            body('teacher', 'Teacher is not valid email.').trim().isEmail().normalizeEmail(),
            body('students', 'Students must be array',).isArray(),
            body('students', 'Students must not be empty',).custom(customValidator.validateArrayNotEmpty),
            body('students.*', 'One or some of the students are not valid emails').trim().isEmail().normalizeEmail()
        ]
    }
    ,
    register(req, res, next) {
        const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
        if (!errors.isEmpty()) {
            res.status(422).json({message: errorResponse.formatError(errors)});
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
