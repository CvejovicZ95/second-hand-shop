import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useGetProductById = (id) => {
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/api/ads/${id}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
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

export default useGetProductById;
