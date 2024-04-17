import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getProductsByAuthor,
  deleteProduct,
  updateProduct,
} from "../api/productsApi.js";

export const useGetProductByAuthor = (authorId) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductsByAuthor = async () => {
      setLoading(true);
      try {
        const data = await getProductsByAuthor(authorId);
        setProducts(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsByAuthor();
  }, [authorId]);

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id),
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateProduct = async (
    id,
    updatedName,
    updatedAbout,
    updatedPrice,
  ) => {
    try {
      await updateProduct(id, updatedName, updatedAbout, updatedPrice);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id
            ? {
                ...product,
                name: updatedName,
                about: updatedAbout,
                price: updatedPrice,
              }
            : product,
        ),
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { loading, products, handleDeleteProduct, handleUpdateProduct };
};
