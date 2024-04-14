import { Link } from "react-router-dom"
import { useState } from "react"
import {Logo} from "../Logo/Logo.jsx"
import {useRegister} from "../../hooks/useRegister.js"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "./Register.css";

const Register=()=>{

  const [inputs,setInputs]=useState({
    firstLastName:'',
    username:'',
    password:'',
    confirmPassword:'',
    email:'',
    phoneNumber:''
  })

  const {registration,registerClient}=useRegister()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    await registerClient(inputs)
  }

  return(
    <div className="register-div">
      <form className="registerForm" onSubmit={handleSubmit}>
        <Logo/>
        <input
          type="text"
          placeholder="First and Last name"
          value={inputs.firstLastName}
          onChange={(e)=>setInputs({...inputs,firstLastName:e.target.value})}
        />
        <input
          type="text"
          placeholder="Username"
          value={inputs.username}
          onChange={(e)=>setInputs({...inputs,username:e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          value={inputs.password}
          onChange={(e)=>setInputs({...inputs,password:e.target.value})}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={inputs.confirmPassword}
          onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})}
        />
        <input
          type="email"
          placeholder="Email"
          value={inputs.email}
          onChange={(e)=>setInputs({...inputs,email:e.target.value})}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={inputs.phoneNubmer}
          onChange={(e)=>setInputs({...inputs,phoneNumber:e.target.value})}
        />

        <button type="submit" className="register-button">Register</button>

        {registration && <p style={{color:'green',fontSize:'22px'}}>Registration successfull!</p>}

        {registration && <Link to={'/'}><button className="see-products-btn">Click to see our Products!</button></Link>}
        <ToastContainer/>

        {!registration && <p className="register-now">Already registred?<Link to='/login'><span> Switch to Login page!</span></Link></p>}

        <p className="captcha">This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
      </form>
    </div>
  )
}

export {Register}