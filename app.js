//Getting dependencies
const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const routes = require('./routes/index');
const employee = require('./routes/employee');
const manager = require('./routes/manager');
mongoose.Promise = global.Promise   //Setting the mongoose promise to global promise
mongoose.connect("mongodb://ems:ems@ds135592.mlab.com:35592/ems") //Establishing connection with Database
const db=mongoose.connection; //assigning the connection to constant
db.on('connected',function(err){  //checking the connection
if(err){
    console.log(err);
  }
  else{
    console.log('connected');
  }
});
process.env.SECRET_KEY = "ems"    //setting the key for encryption
app.use(logger('dev'));           //initializiong logger module
app.use(bodyParser.json());       //Initializing body-parser
app.use(bodyParser.urlencoded()); //
app.use('/login', routes);        //
app.use('/employee', employee);   //Setting routes
app.use('/manager',manager);      //
module.exports = app;             //Exporting module for importing in ./bin/www
