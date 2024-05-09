const jwt = require("jsonwebtoken")
// const secretKey = require("../configuration/jwtConfig")

function generateToken(user){
    const payload ={
        id:user._id,
        email:user.email,
        role:user.role
    };
   return jwt.sign(payload,"my-secret-key",{expiresIn:"1h"})

  
}

function generateRefreshToken(user){
    const payload ={
        id:user._id,
        email:user.email,
        role:user.role
    };
   return jwt.sign(payload,"my-secret-key",{expiresIn:"7h"})
}

function verifyToken(token){
return jwt.verify(token,"my-secret-key")
}

module.exports = {generateRefreshToken,generateToken,verifyToken}
