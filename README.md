# employee-system
Documentation
Introduction
This project has the rest apis for seeing and creating leaves for employees and
seeing all the leaves and approving leaves by manager.
Rest Apis
1) Url:https://hidden-mountain-34085.herokuapp.com/login
Method:Post
description:logs the user in by providing access token which is used to detect
authentication and retrieve user information by decoding.
Sample Request Object (In Json Format):
{
“username”:”test2”,
“password”:”test”
}
Response:Response contains a json object with accessToken attribute
2)Url:https://hidden-mountain-34085.herokuapp.com/user/leaves
Method:Get
Header:accesstoken(with name “token”)
Description:Gets all the leaves requested by user and their corresponding status by
verifying and decoding access token.
As this is url uses get request, there is no need to send any data in request accept access
token in headers.
Response:Response contains information of all the leaves by employee (in JSON format)
3) Url:https://hidden-mountain-34085.herokuapp.com/employee/requestLeaveMethod:Post
Header:AccessToken
Description:Requests leave
Sample request object(in JSON format):
{
“StartDate”:”27/07/2017”,
“EndDate”:”30/07/2017”,
“LeaveType”:”Travel”,
“Reason”:”trip”
}
Response:Response contains the details of the requested leave object
4)Url:https://hidden-mountain-34085.herokuapp.com/manager/leaves
Method:Get
Headers:Manager access token with same name
Description:Get all the leaves in the database
There is no data in request as this a get request
Response:Response contains all the leave requests in the database in JSON format.
5)Url:https://hidden-mountain-34085.herokuapp.com/manager/approveLeave/:id
Method:put
Headers:Headers contain manager access token
There is not need to send any data accept the id the request to be approved in url
Description:Approves leave request with specific id
Response:Response contains the status of approval in json format
6)Url:https://hidden-mountain-34085.herokuapp.com/manager/insertUser
Method:Post
Description:Lets manager insert new user
Headers:Headers contain manager access token
Sample Request object (in JSON format)
[
  {
    "key":"username",
    "value":"test3",
    "description":""
  },
  {
    "key":"password",
    "value":"test3",
    "description":""
  },
  {
    "key":"email",
    "value":"test3@test3.test3",
    "description":""
  },
  {
    "key":"FirstName",
    "value":"test3",
    "description":""
  },
  {
    "key":"LastName",
    "value":"test3",
    "description":""
  },
  {
    "key":"role",
    "value":"employee",
    "description":""
  }
]
Response:Response contains the creadentials of newly inserted user.
