import express ,{Application}from 'express';
import mongoose from 'mongoose'
import authRouter from './routes/authRoute'
import bodyParser from 'body-parser';
import cors from "cors"
import * as env from  "dotenv"
const app:Application = express()

//middleware
env.config();
app.use(cors());
app.use(bodyParser.json())
app.use(express.urlencoded({extended : false}))

//routes
app.use("/api/auth",authRouter);

// enviourment setup
var connectionString :string = process.env.CONNECTION_STRING as string;


mongoose.connect(connectionString)
  .then(() => {
    debugger;
  console.log("Connectd");

  app.listen(process.env.SERVER_PORT)
  }
);

  