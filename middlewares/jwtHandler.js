const {verifyJwtToken} = require('../utils/jwtHelper')
const userRep = require('../repositories/users')

//fns:
// retreive token from http header(key :authorisation )
//to check token validity
//if not valid ,send response as unauthorised(status:401)
// else if valid then allow router to redirect to access resource(here, redirect to product api)
const jwtHandler = async (req,res,next)=>{
    // retreive token from http header(authorisation)
var token = req.headers['authorization']
if(token && token.includes('Bearer'))
{
 verifyJwtToken(token).then((result)=>{

    const userId = result.userId;
    req.userId = userId;
    next();
 }).catch(error=>{
    res.status(401).json({message:'Inalid token'})
 })
}
else{
    res.status(401).json({message:'No token is provided'})
}
}

//fns:
//to verify the roles and give permission to access 
// here it returns an async method 
const verifyRoles =(roles)=>{  
    return  async(req,res,next)=>{  
        try{      
        //in this async method,it first check the roles assigned for this userId(in the req object, like req.userId)
        // then we will check if this users roles are the same as to get the access(the role that is designated in the router to add product)          
        const userRoles = await userRep.getUserRolesbyId(req.userId)//send the userId that is attached to request object in jwtHandler      
        var hasRole = false;        
        for(let userRole of userRoles){
            if(roles.includes(userRole.name)){                
                hasRole=true;
                break;
            }
        }
        if(hasRole){
          return next();
        }
        else{
            return res.status(403).json({message:"No access is granted... "})
        }   
}    catch(error)
    {
        return res.status(500).json({ message: error.message });

    }
}
}
    module.exports={jwtHandler,
        verifyRoles
    }