//Getting dependencies
const express = require('express');
const router = express.Router();
const cryptoJS = require('crypto-js')
const user = require('../models/user')
const jwt = require('jsonwebtoken')
//route for loging in
router.post('/' ,function(req, res) {
  //checking if both username and password are provided
  if(!(req.body.username && req.body.password)){
    res.send("both username and password are required")
  }
  else{
    //getting users with given username
    user.getUser(req.body,function(err,users){
      if(err){
        res.send({err:err.err})
      }
      else{
        //Checking all the users for required password by decrypting passwords
        users.forEach(function(user,index,arr){
          console.log(cryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY))
          if(cryptoJS.AES.decrypt(user.password.toString(),process.env.SECRET_KEY).toString(cryptoJS.enc.Utf8) == req.body.password){
            //Generation access token for user and sending
            const token = jwt.sign(user,process.env.SECRET_KEY)
            res.send({accessToken:token})
          }
          else{
            //sending error if no user is found with required username and password
            res.send({err:"Invalid username or password",users:arr});
          }
        })

      }
    })
  }
});
//exporting module for using in app.js
module.exports = router;
