import express from "express";
import cors from "cors";
import setupMiddware from './middlewares'
import {connect} from './db'
import {authRouter} from './aurthorization'
import {restRouter} from './api/restRouter'
const app = express();
const net = require('net');
const port = 8000;
const host = 'https://stark-mesa-34134.herokuapp.com/';

require("dotenv").config()

setupMiddware(app)

connect();

app.use(cors());
app.use('/auth',(req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Authorization, Accept, Access-Control-Al" +
        "low-Methods"
    )
  res.header("X-Frame-Options", "deny")
  res.header("X-Content-Type-Options", "nosniff")
  next();
})
app.use('/auth',authRouter);
app.use(express.static('public'));
app.use('/api',(req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Authorization, Accept, Access-Control-Al" +
        "low-Methods"
    )
  res.header("X-Frame-Options", "deny")
  res.header("X-Content-Type-Options", "nosniff")
  next();
})
app.use('/api',restRouter)
export default app;
