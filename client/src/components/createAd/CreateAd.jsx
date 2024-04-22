import React, { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUpload } from "../../hooks/useUploadProduct.js";
import { Logo } from "../logo/Logo.jsx";
import { Footer } from "../layout/footer/Footer.jsx";
import { useAuthContext } from "../../context/AuthContext.js";
import "./CreateAd.css";

export const CreateAd = () => {
  const { authUser } = useAuthContext();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [price, setPrice] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [image, setImage] = useState(null);

  const [completed, setCompleted] = useState(false);
  const { upload, uploadAdHandler } = useUpload();

  useEffect(() => {
    const userData = localStorage.getItem("authUser");
    if (userData) {
      const { _id } = JSON.parse(userData);
      setAuthorId(_id);
    }
  }, []);

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setImage(imageFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await uploadAdHandler({
      name,
      about,
      price,
      authorId,
      image,
    });
    setName("");
    setAbout("");
    setPrice("");
    setImage(null);
    setCompleted(true);
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="About product..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price (€)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="text"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            disabled
            style={{ display: "none" }}
          />
          <div className="upload-wrapper">
            <span className="upload-icon">
              <FaUpload />
            </span>
            <span className="upload-label">Choose image:</span>
            <input
              type="file"
              className="upload-file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {image && <p>Selected image: {image.name}</p>}
          </div>

          {upload && completed && (
            <p style={{ color: "green", fontSize: "22px" }}>
              Product upload complete
            </p>
          )}

          <button type="submit">Create Ad</button>
          {upload && completed && <hr className="hr" />}
          {upload && completed && (
            <Link to="/">
              <button>Go back to Home Page</button>
            </Link>
          )}
          <ToastContainer />
        </form>
      ) : (
        <div>
          <p style={{ color: "red", fontSize: "22px" }}>
            Please login so you can create Ad
          </p>
          <Link to={"/login"}>
            <button className="login-btn">Login</button>
          </Link>
        </div>
      )}
      <Footer />
    </div>
  );
};
