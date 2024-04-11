import { useAuthContext } from "../context/AuthContext";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useLogout=()=>{
  const {logout}=useAuthContext()

  const logoutHandler=async()=>{
    try{
      const res=await fetch('http://localhost:4000/api/auth/logout',{
        method:'POST',
        headers:{'Content-Type':"application/json"},
      })
      const data=await res.json()
      if(data.error){
        throw new Error(data.error)
      }
      logout()
    }catch(error){
      toast.error(error.message)
    }
  }
  return {logoutHandler}
}

export {useLogout}