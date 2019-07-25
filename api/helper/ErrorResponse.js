const ErrorResponse = {
    error: (msg) => {
        return {
            message: msg
        }
    },
    formatError: (errors) => {
        let formattedString = '';
        errors.array().forEach((value, index, array) => {
            formattedString = formattedString + value.msg
            if (index !== array.length - 1) {
                formattedString = formattedString + '|'
            }
        });
        return formattedString
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

module.exports = ErrorResponse
