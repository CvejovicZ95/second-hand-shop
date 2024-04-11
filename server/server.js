import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'

import {connect} from "./src/db/connectDB.js"
import {authRouter} from "./src/routes/auth.routes.js"
import {productRouter} from "./src/routes/products.routes.js"




const app=express()
dotenv.config();

const PORT=process.env.PORT || 5000;

const corsOptions={
  origin: ['http://localhost:3000', 'http://192.168.1.6:3000'],
  optionsSuccessStatus:200,
  credentials: true
};

app.use(cors(corsOptions))
app.use(express.json())

app.use(cookieParser());


app.use('/api/auth',authRouter)
app.use('/api',productRouter)


app.listen(PORT,()=>{
  connect();
  console.log(`Server is listening on port ${PORT}`)
})
