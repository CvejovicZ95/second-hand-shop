import {toast} from 'react-toastify';
import { useAuthContext } from '../context/AuthContext';
import {setCookie} from './useSetCookie';

const useLogin=()=>{
  const {login}=useAuthContext()

  const loginHandler=async(username,password)=>{
    const success=handleErrors({username,password})
    if(!success) return

    try{
      const res=await fetch('http://localhost:4000/api/auth/login',{
        method:"POST",
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify({username,password})
      })

      const data=await res.json()
      if(data.error){
        if(data.error==='Invalid username or password'){
          throw new Error('Incorrect username or password')
        }else{
          throw new Error(data.error)
        }
      }

      login(data)
      setCookie('token',data.token,30)
    }catch(error){
      toast.error(error.message)
    }
  }
  return {loginHandler}
}

export {useLogin}


function handleErrors({username,password}){
  if(!username || !password){
    toast.error('Please fill in feilds')
    return false
  }
  return true
}