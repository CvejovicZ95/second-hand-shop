import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useGetProductByAuthor = (authorId) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProductsbyAuthor = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/api/ads/author/${authorId}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setProducts(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getProductsbyAuthor();
  }, [authorId]);
  
  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/ads/delete/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ deleted: true }) 
      });
      setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateProduct = async (id, updatedName, updatedAbout, updatedPrice) => {
    try {
      await fetch(`http://localhost:4000/api/ads/update/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ name: updatedName, about: updatedAbout, price: updatedPrice }) 
      });
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product._id === id ? { ...product, name: updatedName, about: updatedAbout, price: updatedPrice } : product
        )
      );
    } catch (error) {
      toast.error(error.message);
    }
  };


  return { loading, products, deleteProduct,updateProduct  };
};

export {useGetProductByAuthor};
