import mongoose from "mongoose"

const connect=()=>{
  mongoose.connect('mongodb://127.0.0.1/SecondHandFullApp')
  .then(()=>console.log('Connected to DB'))
  .catch((error)=>{console.log('Smth went wrong',error)})
}

export default connect