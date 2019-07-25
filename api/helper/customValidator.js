const validator = require('validator');


module.exports = {
    validateArrayNotEmpty: function (value) {
        if (value.length === 0) {
            return
        }
        return value;
    },

};