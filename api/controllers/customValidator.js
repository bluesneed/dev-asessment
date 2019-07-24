var validator = require('validator');

module.exports = {

    validateArrayNotEmpty: function (value) {
        if (value.length === 0) {
            return
        }
        return value;
    },


    validateEmailArray : function (value){
        value.forEach(email =>{
            if(!validator.isEmail(email)){
                throw Error()
            }
        } );
        return value
    }

};