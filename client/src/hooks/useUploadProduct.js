import { useState } from "react";
import { toast } from "react-toastify";
import { uploadAd } from "../api/productsApi.js";

export const useUpload = () => {
  const [upload, setUpload] = useState(false);

  const uploadAdHandler = async ({ name, about, price, authorId, image }) => {
    try {
      const success = handleErrors({ name, about, price });
      if (!success) return;

      await uploadAd(name, about, price, authorId, image);

      setUpload(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
      setUpload(false);
    }
  };

  return { upload, uploadAdHandler };
};

function handleErrors({ name, about, price }) {
  if (!name || !about || !price) {
    toast.error("Please fill all fields");
    return false;
  }
  if (isNaN(price)) {
    toast.error("Please enter a valid price");
    return false;
  }
  return true;
}
