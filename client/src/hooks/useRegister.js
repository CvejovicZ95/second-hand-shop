import {useAuthContext} from '../context/AuthContext';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

const useRegister=()=>{
  
  const [registration,setRegistration]=useState(false)
  const {setAuthUser}=useAuthContext()

  const register = async ({firstLastName,username,password,confirmPassword,email,phoneNumber})=>{
    const success=handleErrors({firstLastName,username,password,confirmPassword,email,phoneNumber})
    if(!success) return

    try{
      const res=await fetch('http://localhost:4000/api/auth/register',{
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({firstLastName,username,password,confirmPassword,email,phoneNumber})
      })
      const data=await res.json()
      if(data.error){
        throw new Error(data.error)
      }
      localStorage.setItem('secondHand-user',JSON.stringify(data))

      setAuthUser(data)
      setRegistration(true)
    }catch(error){
      setRegistration(false)
      toast.error(error.message)
    }
  }
  return {registration,register}
}

export default useRegister

function handleErrors({firstLastName,username,password,confirmPassword,email,phoneNumber}){
  if(!firstLastName || !username || !password || !confirmPassword || !email || !phoneNumber){
    toast.error('Please fill in all feilds')
    return false
  }
  if(password !==confirmPassword){
    toast.error('Password do not match')
    return false
  }
  if(password.length < 6){
    toast.error('Password must be at least 6 characters')
    return false
  }
  if(username.length < 3){
    toast.error('Username must be at least 4 characters')
    return false
  }
  return true
}