const express = require('express')
const mongoose = require('mongoose');
const authRoute = require('./routes/auth.route')
const env= require("dotenv");
const app = express()

//middleware
app.use(express.json);
app.use(express.urlencoded({extended : false}))
env.config();

//routes
app.use("/api/auth",authRoute);

mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Connectd");
    app.listen(process.env.SERVER_PORT)
  }
);x

  