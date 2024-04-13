import jwt from 'jsonwebtoken'
import {User} from "../models/usersSchema.js"
import config from '../../config.json'
import {logger} from "../../logger.js"

const protectRoute = async (req,res,next)=>{
  try{
    const token=req.cookies.jwt;
    if(!token){
      logger.error('Unauthorized - No Token Provided');
      return res.status(401).json({error:'Unauthorized-No Token Provided'})
    }

    const decoded=jwt.verify(token, config.secret_key)
    
    if(!decoded){
      logger.error('Unauthorized - Invalid Token');
      return res.status(401).json({error:'Unauthorized-Invalid Token'})
    }

    const user=await User.findById(decoded.userId).select('-password')

    if(!user){
      logger.error('User not found');
      return res.status(404).json({error:'User not found'})
    }

    req.user=user

    next()
  }catch(error){
    logger.error('Error in protected route middleware:', error.message);
    res.status(500).json({error:'Server error'})
  }
}

export {protectRoute}