const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const fileRouter = require('./routes/fileRoute')
import {verifyConnection} from './config/MysqlConfig'
import myLogger from './utils/myLogger'

// Execute a SQL query
const app = express();
// app.use(express.json())
app.use(logger('dev'));
app.use(fileUpload())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));
require('dotenv').config()

// cors
app.use(require('cors')())


app.use('/file', fileRouter)


verifyConnection()

// listen port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{
    myLogger.info(`Server listen on port ${PORT}`)
})


module.exports = app;
