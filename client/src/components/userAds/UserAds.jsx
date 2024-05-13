import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../logo/Logo";
import { Footer } from "../layout/footer/Footer";
import { useAuthContext } from "../../context/AuthContext";
import { useGetProductByAuthor } from "../../hooks/useGetProductsByAuthor";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { scrollToTop } from "../../hooks/useScrollTop";
import "./UserAds.css";

export const UserAds = () => {
  const { authUser } = useAuthContext();
  const [authorId, setAuthorId] = useState(authUser ? authUser._id : null);

  useEffect(() => {
    if (authUser) {
      setAuthorId(authUser._id);
    }
  }, [authUser]);

  const { loading, products, handleDeleteProduct, handleUpdateProduct } =
    useGetProductByAuthor(authorId);

  const [updatedName, setUpdatedName] = useState("");
  const [updatedAbout, setUpdatedAbout] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  // eslint-disable-next-line
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this ad?",
    );
    if (confirmed) {
      try {
        await handleDeleteProduct(id);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setUpdatedName(product.name);
    setUpdatedAbout(product.about);
    setUpdatedPrice(product.price);
  };

  const handleSaveUpdate = async (id) => {
    try {
      await handleUpdateProduct(id, updatedName, updatedAbout, updatedPrice);
      setSelectedProduct(null);
      setIsUpdating(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="userAds">
      <Logo />
      <h1>List of your Ads</h1>
      {authUser ? (
        loading ? (
          <p>Loading...</p>
        ) : (
          <div className="adsList">
            {products.filter((product) => !product.deleted).length === 0 ? (
              <p style={{ color: "red", margin: "auto", fontSize: "26px" }}>
                You havent published any active ads yet.
              </p>
            ) : (
              products.map(
                (product) =>
                  !product.deleted && (
                    <div key={product._id} className="ad">
                      <h2>{product.name}</h2>
                      <p>{product.about}</p>
                      <img
                        src={`${product.imagePath}`}
                        alt="ad"
                        width="250px"
                      />
                      <span>Author: {product.authorId.firstLastName}</span>
                      <span>Price: {product.price} €</span>
                      <span>Phone number: {product.authorId.phoneNumber}</span>

                      <button
                        className="update-button"
                        onClick={() => handleUpdate(product)}
                      >
                        Update
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>

                      {selectedProduct &&
                        selectedProduct._id === product._id && (
                          <div className="update-div">
                            <input
                              className="update-input"
                              type="text"
                              value={updatedName}
                              onChange={(e) => setUpdatedName(e.target.value)}
                              placeholder="Product name"
                            />
                            <textarea
                              className="update-area"
                              value={updatedAbout}
                              onChange={(e) => setUpdatedAbout(e.target.value)}
                              placeholder="About product"
                            />
                            <input
                              className="update-input"
                              type="text"
                              value={updatedPrice}
                              onChange={(e) => setUpdatedPrice(e.target.value)}
                              placeholder="Price"
                            />
                            <button
                              className="update-button"
                              onClick={() => handleSaveUpdate(product._id)}
                            >
                              Save
                            </button>
                          </div>
                        )}
                    </div>
                  ),
              )
            )}
          </div>
        )
      ) : (
        <div>
          <p style={{ color: "red", fontSize: "22px" }}>
            Please login to see your Ads...
          </p>
          <Link to="/login">
            <button className="home-page-btn">Login</button>
          </Link>
        </div>
      )}
      <Link to="/">
        <button onClick={scrollToTop} className="home-page-btn">
          Go back to Home Page
        </button>
      </Link>
      <Footer />
    </div>
  );
};
