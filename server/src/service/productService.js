import { Product } from "../models/productsSchema.js";

export const getAllProducts = async () => {
  try {
    return await Product.find().populate('authorId');
  } catch (error) {
    throw new Error('Error fetching all products');
  }
};

export const getProductById = async (productId) => {
  try {
    return await Product.findById(productId).populate('authorId');
  } catch (error) {
    throw new Error('Error fetching product by ID');
  }
};

export const getProductsByAuthor = async (authorId) => {
  try {
    return await Product.find({ authorId }).populate('authorId');
  } catch (error) {
    throw new Error('Error fetching products by author');
  }
};
export const updateProductById = async (productId, newData) => {
  try {
    return await Product.findByIdAndUpdate(productId, newData, { new: true });
  } catch (error) {
    throw new Error('Error updating product');
  }
};

export const markProductAsDeleted = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    product.deleted = true;
    await product.save();
  } catch (error) {
    throw new Error('Error marking product as deleted');
  }
};