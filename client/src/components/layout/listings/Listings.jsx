import { useState } from 'react';
import { Link } from 'react-router-dom';
import {useGetProducts} from "../../../hooks/useGetProducts.js"
import {Search} from "../../Search/Search.jsx"
import "./Listings.css";

export const Listings = () => {
  const { loading, products } = useGetProducts();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(product => !product.deleted); 

  return (
    <>
      <Search 
        handleSearch={handleSearch} 
      />
      <div className="allAds">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredProducts.length === 0 ? (
            <p className='no-products'>Sorry, no products at this time.</p>
          ) : (
            filteredProducts.map((product) => (
              <Link key={product._id} to={`/${product._id}`}>
                <div className="singleAd">
                  <h2>{product.name}</h2>
                  <p>{(product.about).length <=25
                    ? product.about
                    : `${(product.about).slice(0, 25)}...`}</p>
                  <img src={`/images/${product.imagePath}`} alt="ad" width={'170px'} />
                  <span>Author: {product.authorId.firstLastName}</span>
                  <span>Price: {product.price}€</span>
                  <span>Contact: {product.authorId.phoneNumber}</span>
                </div>
              </Link>
            ))
          )
        )}
      </div>
    </>
  );
};