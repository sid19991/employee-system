//getting dependencies
const mongoose = require('mongoose')
const cryptoJS = require('crypto-js')
//defining schema for user
const userSchema = mongoose.Schema({
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  FirstName:{
    type:String,
    required:true
  },
  LastName:{
    type:String,
    required:true
  },
  role:{
    type:String,
    required:true
  }
})
//initializing object to be sent
var router = {}
//initializing model and storing in object
router.user = mongoose.model('user',userSchema)
//function for inserting user
router.insertUser = function(userCredentials,callback){
//encrypting user password
  userCredentials.password = cryptoJS.AES.encrypt(userCredentials.password,process.env.SECRET_KEY)
//initializing the document
  const userToInsert = new router.user(userCredentials)
//saving it in database
  userToInsert.save(callback);
}
//function for getting users with specified username
router.getUser = function(userDetails,callback){
//finding users
  router.user.find({username:userDetails.username},function(err,users){
    if(err){
      callback({err:'could not retrive user details',message:err},null)
    }
    else{
      //returning the array to callback function
      callback(null,users)
    }
  })
}
//exporting model
module.exports = router
