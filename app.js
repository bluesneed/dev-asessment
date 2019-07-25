const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const registerRoutes = require('./api/routes/register');
const { body } = require('express-validator');

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./dist/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api/v1', router);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '10mb'}));



// app.use(expressValidator())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Routes to handle request
app.use('/api', registerRoutes);

app.use((req, res, next) => {
    const error = new Error('Endpoint invalid');
    error.status = 404;
    next(error)

});

app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            message: error.message
        })
    }
);


module.exports = app;