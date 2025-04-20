const addUser= "insert into users(name,username,password)values($1,$2,$3) returning user_id"
const getUserbyUsername = "select user_id,name,username,password from users where username=$1"
const getUserbyUserId = "select user_id,name,username,password from users where user_id =$1"
const getuserRolesbyId = "select r.name from public.role as r inner join userroles as ur on r.role_id = ur.role_id where ur.user_id = $1"
module.exports = {
    addUser,
    getUserbyUsername,
    getUserbyUserId,
    getuserRolesbyId
}