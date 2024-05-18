import express from 'express';
import mongoose from 'mongoose'
import authRouter from './routes/auth.route.js'
import bodyParser from 'body-parser';
import cors from "cors"
import * as env from  "dotenv"
const app = express()

//middleware
env.config();
app.use(cors());
app.use(bodyParser.json())
app.use(express.urlencoded({extended : false}))

//routes
app.use("/api/auth",authRouter);

mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    debugger;
  console.log("Connectd");
  app.listen(process.env.SERVER_PORT)
  }
);

  