import React, { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useUpload} from "../../hooks/useUploadProduct.js";
import {Logo} from "../Logo/Logo.jsx"
import {Footer} from "../Layout/Footer/Footer.jsx"
import { useAuthContext } from "../../context/AuthContext.js";
import "./CreateAd.css";

const CreateAd = () => {
  const { authUser } = useAuthContext();
  
  const [inputs, setInputs] = useState({
    name: "",
    about: "",
    price: "",
    authorId: "",
    image: null 
  });

  const [completed,setCompleted]=useState(false)
  const { upload, uploadAdHandler } = useUpload();
  
  useEffect(() => {
    const userData = localStorage.getItem("authUser");
    if (userData) {
      const { _id } = JSON.parse(userData);
      setInputs((prevInputs) => ({
        ...prevInputs,
        authorId: _id
      }));
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setInputs((prevInputs) => ({
      ...prevInputs,
      image: imageFile
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await uploadAdHandler(inputs);
    setInputs({
      name: "",
      about: "",
      price: "",
      authorId: inputs.authorId,
      image: null
    });
    setCompleted(true)
  };

  return (
    <div className="createAd-div">
      <Logo />
      {authUser ? (
        <form className="createAdForm" onSubmit={handleSubmit}>
          <h1>Create Ad</h1>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={inputs.name}
            onChange={handleInputChange}
          />
          <textarea
            type="text"
            placeholder="About product..."
            name="about"
            value={inputs.about}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Price (€)"
            name="price"
            value={inputs.price}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="authorId"
            value={inputs.authorId}
            onChange={handleInputChange}
            disabled
            style={{display:'none'}}
          />
          <div className="upload-wrapper">
            <span className="upload-icon"><FaUpload /></span>
            <span className="upload-label">Choose image:</span>
            <input
              type="file"
              name="image"
              className="upload-file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {inputs.image && (
              <p>Selected image: {inputs.image.name}</p>
            )}
          </div>

          {upload && completed && <p style={{color:'green', fontSize:'22px'}}>Product upload complete</p>}

          <button type="submit">Create Ad</button>
          {upload && completed && <hr className="hr"/>}
          {upload && completed && <Link to="/">
            <button>Go back to Home Page</button>
          </Link>}
          <ToastContainer />
        </form>
      ) : (
        <div>
        <p style={{color:'red',fontSize:'22px'}}>Please login so you can create Ad</p>
        <Link to={'/login'}><button className="login-btn">Login</button></Link>
        </div>
      )}
      <Footer />
    </div>
  );
};

export  {CreateAd};