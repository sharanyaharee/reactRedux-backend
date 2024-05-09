const User = require("../models/User");
const bcrypt = require("bcrypt");
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function editUser(req, res) {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    await user.save();

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User Not found" });
    }
    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function addUser(req, res) {
  try {
    const { firstName, lastName, email,password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password:hashedPassword
    });

    await newUser.save();
    res.status(200).json({ message: "user added successfully", user: newUser });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
        res.status(400).json({ message: "User already exists with the same email address" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
  }
}

module.exports = { getAllUsers, editUser, deleteUser, addUser };
