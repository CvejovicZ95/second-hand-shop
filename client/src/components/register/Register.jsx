import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../logo/Logo";
import { useRegister } from "../../hooks/useRegister";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

export const Register = () => {
  const [firstLastName, setFirstLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { registration, registerClient } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerClient({
      firstLastName,
      username,
      password,
      confirmPassword,
      email,
      phoneNumber,
    });
  };

  return (
    <div className="register-div">
      <form className="registerForm" onSubmit={handleSubmit}>
        <Logo />
        <input
          type="text"
          placeholder="First and Last name"
          value={firstLastName}
          onChange={(e) => setFirstLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <button type="submit" className="register-button">
          Register
        </button>

        {registration && (
          <p style={{ color: "green", fontSize: "22px" }}>
            Registration successfull!
          </p>
        )}

        {registration && (
          <Link to={"/"}>
            <button className="see-products-btn">
              Click to see our Products!
            </button>
          </Link>
        )}
        <ToastContainer />

        {!registration && (
          <p className="register-now">
            Already registred?
            <Link to="/login">
              <span> Switch to Login page!</span>
            </Link>
          </p>
        )}

        <p className="captcha">
          This page is protected by Google reCAPTCHA to ensure you are not a
          bot.
        </p>
      </form>
    </div>
  );
};
