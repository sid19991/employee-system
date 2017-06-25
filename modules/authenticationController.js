//Getting module for generating access token
const jwt = require('jsonwebtoken')
var router = {}
//function for checking and decoding access token
router.checkAuthentication = function(req,res,next){
//check if request headers contain access token
  if(!req.headers['token']){
    res.send("Access token is required for access")
  }
  else{
    //verify and decode access token
    jwt.verify(req.headers['token'],process.env.SECRET_KEY,function(err,decode){
      if(err){
        //send error if token is invalid
        res.send("Invalid access token")
      }
      else{
        //store the decoded information for further use
        req.decode = decode;
        next()
      }
    })
  }
}
module.exports = router
