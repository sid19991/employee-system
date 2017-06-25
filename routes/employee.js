//Getting dependencies
const express = require('express');
const router = express.Router();
const leave = require('../models/leave')
const authentication = require('../modules/authenticationController')
const _ = require('lodash')
//authentication.checkAuthentication is a middleware for checking and decoding access token
router.get('/leaves',authentication.checkAuthentication,function(req,res){    //route for getting all the leaves of given user
  leave.getUserLeaves(req.decode._doc._id,function(err,leaves){     //function for getting leaves from the database
    if(err){
      res.send({err:err.err})
    }
    else{
      res.send({leaves:leaves})
    }
  })
})
//route for requesting leave
router.post('/requestLeave',authentication.checkAuthentication,function(req,res){
//Converting start date and end date from string to date format
  var dateParts = req.body.StartDate.split('/')
  var newStartDate = new Date(dateParts[2],dateParts[1]-1,dateParts[0])
  var endDateParts = req.body.EndDate.split('/')
  var newEndDate = new Date(endDateParts[2],endDateParts[1]-1,endDateParts[0])
  var newleave = _.cloneDeep(req.body)
  //Assigning new start date , end date and user id to leave request
  newleave.RequestBy = req.decode._doc._id
  newleave.StartDate = newStartDate
  newleave.EndDate = newEndDate
//validating leave request with respect to start date and end date
  if(newleave.StartDate<newleave.EndDate){
  leave.requestLeave(newleave,function(err,leaveDetails){
    if(err){
      res.send({err:err.err})
    }
    else{
      res.send({status:"leave inserted",details:leaveDetails})
    }
  })
  }
  else{
    res.send("Start Date must be before end date")
  }
})
//exporting module for using in app.js
module.exports = router;
