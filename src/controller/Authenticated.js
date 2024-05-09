const User = require("../models/User")

async function getUserById(req,res){
    try{
        const userId = req.user.id;
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.json(user)
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}

async function updateUserProfileImage(req, res) {
    try {
      const userId = req.user.id;
      const profileImage = req.file.path;
  
         const user = await User.findByIdAndUpdate(
        userId,
        { profileImage },
        { new: true } 
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ message: "Profile image updated successfully", user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

module.exports ={getUserById,updateUserProfileImage}