import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {getProducts} from '../api/productsApi';

export const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts(); 
        setProducts(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  
  return { loading, products };
};