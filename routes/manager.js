//Getting dependencies
const router = require('express').Router()
const user = require('../models/user')
const leave = require('../models/leave')
const authenticationController = require('../modules/authenticationController')
//authenticationController.checkAuthentication is a middleware for checking and decoding access token
//route for inserting user if the logged in user in a manager
router.post('/insertUser',authenticationController.checkAuthentication,function(req,res){

  if(req.decode._doc._role == "manager"){
    //function for inserting user
    user.insertUser(req.body,function(err,insertedUser){
    if(err){
//sending error if any
      res.send({error:err})
    }
    else{
      //sending the credentials of inserted user
      res.send({status:'user inserted',credetials:insertedUser})
    }
  })
}
else{
  res.send("You are not manager")
}

})
//route for getting all the leaves
router.get('/leaves',authenticationController.checkAuthentication,function(req,res){
    if(req.decode._doc.role == "manager"){
//function for getting all the leaves
      leave.getLeaves(function(err,leaves){
      if(err){
        res.send({err:err.err})
      }
      else{
        //sending all the leaves
        res.send({leaves:leaves})
      }
    })
  }
  else{
    res.send("You are not manager")
  }
})
//route for approving the leave given the leave id
router.put('/approveLeave/:id',authenticationController.checkAuthentication,function(req,res){
  if(req.decode._doc.role == "manager")
  {
    //function for approving leave with given id
    leave.approveLeave(req.params.id,function(err,result){
    if(err){
      res.send({err:err.err})
    }
    else{
      res.send({status:"leave approved"})
    }
  })
}
else{
  res.send("You are not manager")
}
})
//exporting module for using in app.js
module.exports = router
