import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {getProductById} from "../api/productsApi.js"

export const useGetProductById = (id) => {
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id); 
        setProduct(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);
  
  return { loading, product };
};