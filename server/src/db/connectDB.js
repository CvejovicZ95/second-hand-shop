import mongoose from "mongoose"

export const connect=()=>{
  mongoose.connect(process.env.DATABASE_URL)
  .then(()=>console.log('Connected to DB'))
  .catch((error)=>{console.log('Smth went wrong',error)})
}