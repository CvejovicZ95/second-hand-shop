const apiUrl = process.env.API_BASE_URL;

export const getProductById = async (id) => {
  try {
    const res = await fetch(`${apiUrl}/api/ads/${id}`);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProducts = async () => {
  try {
    const res = await fetch(`${apiUrl}/api/ads`);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductsByAuthor = async (authorId) => {
  try {
    const res = await fetch(`${apiUrl}/api/ads/author/${authorId}`);
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteProduct = async (id) => {
  try {
    await fetch(`${apiUrl}/api/ads/delete/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deleted: true }),
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProduct = async (
  id,
  updatedName,
  updatedAbout,
  updatedPrice,
) => {
  try {
    await fetch(`${apiUrl}/api/ads/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: updatedName,
        about: updatedAbout,
        price: updatedPrice,
      }),
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const uploadAd = async (name, about, price, authorId, image) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("about", about);
    formData.append("price", price);
    formData.append("authorId", authorId);
    formData.append("image", image);

    const res = await fetch(`${apiUrl}/api/ads`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to upload ad");
    }

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};
