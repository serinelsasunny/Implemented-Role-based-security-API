const usersRep = require("../repositories/users");
const errorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asynchandler");
const { createJwtToken } = require("../utils/jwtHelper");
const {comparePasswords} = require('../utils/passwordHelper')

//@desc POST(add/create) the user
//@route POST api/users/
//access public
const addUser = asyncHandler(async (req, res, next) => {
  const newUser = req.body;
  const { name, username, password } = newUser;
  const existingUser = await usersRep.getUserbyUsername(username);
  console.log("existing user:", existingUser);
  if (existingUser && existingUser.length > 0) {
    return next(
      new errorResponse(`user with username,${username} already exists`, 400)
    );
  }

  const userId = await usersRep.addUser(name, username, password);
  const token = createJwtToken(userId);
  if (userId) {
    res.status(200).json({
      success: true,
      message: "a new user is successfully created",
      name: name,
      token: token,
    });
  }
});

//@desc POST(login) the user
//@route POST api/users/login
//access public
//stpes:1.get user by username.If user exists the proceeds or else return invalid credentials
//      2.compare user provided password with the hashed password already stored for the same user.If matched then proceeds or else invalid credential message is provided.
//      3.if user is valid then create token and return it.
const loginUser = asyncHandler(async (req, res, next) => {
  const newUser = req.body;
  const { name, username, password } = newUser;
  const existingUser = await usersRep.getUserbyUsername(username);
  
  if (!existingUser || existingUser.length == 0) {
    return next(new errorResponse(`Invalid login credentials`, 400));
  }

  const user = existingUser[0];
  console.log(" existing user:",user)
  const isValidPassword = comparePasswords(password,user.password)
console.log("is valid password:",isValidPassword)
  if(isValidPassword){
    const token = createJwtToken(user.user_id)
    console.log("valid user with valid password")
    res.status(200).json({
      success: true,
      message: "The user is logged in succesfully",
      user:{name: user.name},      
      token: token,
    });
  }
  return next(new errorResponse('Invalid login credentials',400));
});
module.exports = {
  addUser,
  loginUser
};
