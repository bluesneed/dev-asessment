const teacher = require('../../models').teacher
const errorResponse = require('./ErrorResponse');

module.exports = {
    create(req, res) {
        return teacher
            .create({
                email: req.body.email
            })
            .then(teacher => res.status(201).json(teacher))
            .catch(error => {
                res.status(400).json(
                    errorResponse.error(error.message))
            })
    }


};