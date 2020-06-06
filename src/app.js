var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
const mysql = require('mysql');

const routes = require('./routes/routes');

const app = express();

console.log(`######## Running in ${app.get('env')} mode!! #########`)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', routes);


module.exports = app;


  