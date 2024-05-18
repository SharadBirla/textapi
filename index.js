import express from 'express';
import mongoose from 'mongoose'
import authRouter from './routes/auth.route.js'
import * as env from  "dotenv"
const app = express()

//middleware
app.use(express.json);
app.use(express.urlencoded({extended : false}))
env.config();

//routes
app.use("/api/auth",authRouter);

mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Connectd");
    app.listen(process.env.SERVER_PORT)
  }
);

  