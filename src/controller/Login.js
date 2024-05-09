const bcrypt = require("bcrypt");
const User = require("../models/User");

const { generateToken,verifyToken, generateRefreshToken } = require("../utils/authUtils");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid Password");
    }

    const token = generateToken(user);

     res.status(200).json({ user: user, token: token });
  } catch (err) {
    res.status(404).json({ message: err.message  });
  }
}
async function refreshToken(req,res){
try{
    const{oldToken} = req.body;
    const decodedToken = verifyToken(oldToken);
    const existingUser =await User.findById(decodedToken.id)
    if(!existingUser){
        throw new error("user not found");
    }

    const newToken = generateRefreshToken(existingUser)
    res.json({token:newToken})

}catch(error){
console.log(error.message)
res.status(401).json({message:"Invalid Token"})
}
}

module.exports = { login, refreshToken };
