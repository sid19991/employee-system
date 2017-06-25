//Getting dependencies
const mongoose = require('mongoose')
//Defining schema for leave object
const leaveSchema = mongoose.Schema({
  StartDate:{
    type:Date
  },
  EndDate:{
    type:Date
  },
  LeaveType:{
    type:String,
    enum:["Medical","Travel"],
    default:0
  },
  Reason:{
      type:String
  },
  RequestBy:{
      type:mongoose.Schema.Types.ObjectId
  },
  RequestedAt:{
    type:Date
  },
  ApprovalStatus:{
      type:String,
      enum:['Pending','Approved','Rejected'],
      default:"Pending"
  },
  ApprovedAt:{
    type:Date
  }
})
//initializing object to export
var router={}
//initializing model and storing in object
router.leave = mongoose.model('leave',leaveSchema)
//function for creating leave
router.requestLeave = function(leaveDetails,callback){
  //set the approval status to pending and date to present date
    leaveDetails.ApprovalStatus = "Pending"
    leaveDetails.RequestedAt = Date.now()
//initialize the document to be inserted
  const newLeave = router.leave(leaveDetails);
//insert the document
  newLeave.save(callback)
}
//function for getting all the leaves
router.getLeaves = function(callback){
  router.leave.find({},callback);
}
//function for getting leaves requested by a specific user
router.getUserLeaves = function(userId,callback){
  router.leave.find({RequestBy:userId},callback)
}
//function for approving leave with given id
router.approveLeave = function(leaveId,callback){
//find the leave
  router.leave.findById(leaveId,function(err,leave){
    if(err){
      callback({err:'could not retrieve leave',message:err},null)
    }
    //set the approval status and approval time and save the document
    else{
      leave.ApprovalStatus = "Approved"
      leave.ApprovedAt = Date.now()
      leave.save(callback)
    }
  })
}
//exporting model for using in other modules
module.exports = router
