import { Link } from "react-router-dom"
import { useState } from "react"
import {Logo} from "./Logo"
import {useLogin} from "../hooks/useLogin"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const Login=()=>{
  
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')

  const {loginHandler}=useLogin()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    await loginHandler(username,password)
    
  }

  return(
    <div className="div-form">
      <form className="loginForm" onSubmit={handleSubmit}>
        <Logo/>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
       <button type="submit" className="login-button">Login</button>
        
        <ToastContainer/>

        <p className="login-now">New to Second-hand?<Link to='/register'><span> Register now!</span></Link></p>
        <p className="captcha">This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
      </form>
    </div>
  )
}

export {Login}