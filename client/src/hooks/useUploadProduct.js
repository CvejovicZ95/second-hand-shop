import { useState } from 'react';
import { toast } from 'react-toastify';

const useUpload = () => {
  const [upload, setUpload] = useState(false);

  const uploadAd = async ({ name, about, price, authorId, image }) => {
    const success = handleErrors({ name, about, price });
    if (!success) return;

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('about', about);
      formData.append('price', price);
      formData.append('authorId', authorId);
      formData.append('image', image);

      const res = await fetch('http://localhost:4000/api/ads', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        throw new Error('Failed to upload ad');
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setUpload(true);
      //setUpload(false);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message);
      setUpload(false);
    }
  };

  return { upload, uploadAd };
};

function handleErrors({ name, about, price }) {
  if (!name || !about || !price) {
    toast.error('Please fill all fields');
    return false;
  }
  return true;
}

export default useUpload;
