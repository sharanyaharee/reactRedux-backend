const User = require("../models/User");

const bcrypt = require("bcrypt");

async function signupUser(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "customer",
    });

    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User Created Successfully", user: savedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { signupUser };
