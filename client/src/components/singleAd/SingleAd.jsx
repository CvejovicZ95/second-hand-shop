import React from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "../layout/header/Header";
import { Footer } from "../layout/footer/Footer";
import { useGetProductById } from "../../hooks/useGetProductById";
import { scrollToTop } from "../../hooks/useScrollTop";
import "./SingleAd.css";

export const SingleAd = () => {
  const { id } = useParams();
  const { loading, product } = useGetProductById(id);

  const formatDescription = (description) => {
    return description
      .split("\n")
      .map((line, index) => <span key={index}>{line}</span>);
  };

  return (
    <div className="singleAd-div">
      <Header />
      <div className="singleAd-page">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2>{product.name}</h2>
            {product && product.about && formatDescription(product.about)}
            {product.imagePath && (
              <img src={`${product.imagePath}`} alt="ad" width={"350px"} />
            )}
            <div className="info-single-product">
              <span>Price: {product.price} €</span>
              {product.authorId && (
                <div>
                  <span>Author: {product.authorId.firstLastName}</span>
                  <span>Phone number: {product.authorId.phoneNumber}</span>
                </div>
              )}
            </div>
            <Link to={"/"}>
              <button onClick={scrollToTop} className="home-page">
                Back to Home Page
              </button>
            </Link>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};
