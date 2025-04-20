var bcrypt = require('bcryptjs')
var salt=bcrypt.genSaltSync(10)

function hashPassword(password){
var hash = bcrypt.hashSync(password,salt)
return hash 
}

//to compare the user password with the hashed password which is stored in db while creating the new user
function comparePasswords(plainPassword,hashedPassword){
    var ismatching = bcrypt.compareSync(plainPassword,hashedPassword);

    return ismatching;
}

module.exports ={ 
    hashPassword,
    comparePasswords
}