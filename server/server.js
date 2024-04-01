import express from 'express'
import connect from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import productsRoutes from './routes/products.routes.js'
import cors from 'cors'



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


app.use('/api/auth',authRoutes)
app.use('/api',productsRoutes)


app.listen(PORT,()=>{
  connect();
  console.log(`Server is listening on port ${PORT}`)
})

//middleware error need to fix, token problem on browser