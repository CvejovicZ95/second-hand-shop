import User from '../models/usersSchema.js';
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const register = async (req,res)=>{
  try{
    const {firstLastName,username,password,confirmPassword,email,phoneNumber}=req.body

    if(password !==confirmPassword){
      return res.status(400).json({error:'Password do not match'})
    }
    const user = await User.findOne({username})
    const mail = await User.findOne({email})
    const phone = await User.findOne({phoneNumber})

    if(user){
      return res.status(400).json({error:'Username is already in use'})
    }

    if(mail){
      return res.status(400).json({error:'Email is already in use'})
    }

    if(phone){
      return res.status(400).json({error:'Phone number is already in use'})
    }

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt)

    const newUser= new User({
      firstLastName,
      username,
      password:hashedPassword,
      email,
      phoneNumber
    })

    if(newUser){
      generateTokenAndSetCookie(newUser._id,res);
      await newUser.save()
    
    res.status(201).json({
      _id:newUser._id,
      username:newUser.username,
      email:newUser.email,
      phoneNumber:newUser.phoneNumber
    })
   }else{
    res.status(400).json({error:'Invalid user data'})
   }
  }catch(error){
    console.log('Error in register controller',error.message)
    res.status(500).json({error:'Server error'})
  }
}

export const login = async (req,res) => {
  try{
    const {username,password}=req.body;
    const user=await User.findOne({username})
    const isPasswordCorrect=await bcrypt.compare(password,user.password || "")

    if(!user || !isPasswordCorrect){
      return res.status(400).json({error:'Invalid username or password'})
    }

    generateTokenAndSetCookie(user._id,res)

    res.status(200).json({
      _id:user._id,
      username:user.username,
      email:user.email,
      phoneNumber:user.phoneNumber
    })
  }catch(error){
    console.log('Error in login controller',error.message)
    res.status(500).json({error:'Server error'})
  }
}

export const logout = async (req,res)=>{
  try{
    res.cookie("token","",{maxAge:0})
    res.status(200).json({message:'Logged out successfully'})
  }catch(error){
    console.log('Error in logout controller',error.message)
    res.status(500).json({error:'Server error'})
  }
}
