var jwt = require('jsonwebtoken')
var SECRETKEY = "ahsjdfj26754"

function createJwtToken(userId)
{
    var token = jwt.sign({userId:userId},SECRETKEY)//sign is a function to create a token using secret key
    return token;
}

function verifyJwtToken(token)
{
    return new Promise((resolve,reject)=>{
 //first remove the 'Bearer' from the token by replace it with '',using replace method in js
 const formattedToken = token.replace('Bearer ','') 
 jwt.verify(formattedToken,SECRETKEY,(error,decoded)=>{
     if(error){
         return reject({valid:false,error:error})
     }
     else
     {
         return resolve( {valid:true,userId:decoded.userId})
     }
 })// verify is the fn provided to verify the token using the secret key ie. used to generate the token )
    })
   
}
module.exports = {createJwtToken,verifyJwtToken}