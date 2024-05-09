
const express = require('express')
const mongoose= require('mongoose')
const signupRoute = require("./src/routes/Signup")
const loginRoute = require("./src/routes/Login")
const adminRoute = require('./src/routes/Admin')
const authenticatedRoute = require("./src/routes/Authenticated")
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express()
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
mongoose.connect("mongodb+srv://Node_JWT:Node_JWTpassword@cluster0.49c4zx7.mongodb.net/Node_JWT")
  .then(() => {
      console.log('connected to mongodb database')
  })
  .catch((err) => {
      console.log('failed to connect to mongodb database');
      throw new Error(err);
  }).then((result)=>app.listen(PORT))
  .catch((err)=>console.log(err))


app.use("/user", signupRoute);
app.use("/auth", loginRoute);
app.use("/api", authenticatedRoute);
app.use("/admin", adminRoute);