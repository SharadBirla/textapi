import express from 'express';
import mongoose from 'mongoose'
import * as authRoute from './routes/auth.route'
import * as env from  "dotenv"
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
);

  