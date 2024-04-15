import { Product } from "../models/productsSchema.js";
import {logger} from "../../logger.js"

export const getAllProducts = async () => {
  try {
    const products = await Product.find().populate('authorId');
    return products;
  } catch (error) {
    logger.error('Error fetching all products:', error.message);
    throw new Error('Error fetching all products');
  }
};

export const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId).populate('authorId');
    if (!product) {
      logger.error('Product not found');
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    logger.error('Error fetching product by ID:', error.message);
    throw new Error('Error fetching product by ID');
  }
};

export const getProductsByAuthor = async (authorId) => {
  try {
    const products = await Product.find({ authorId }).populate('authorId');
    return products;
  } catch (error) {
    logger.error('Error fetching products by author:', error.message);
    throw new Error('Error fetching products by author');
  }
};

export const updateProductById = async (productId, newData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, newData, { new: true });
    logger.info('Product updated successfully:', updatedProduct._id);
    return updatedProduct;
  } catch (error) {
    logger.error('Error updating product:', error.message);
    throw new Error('Error updating product');
  }
};

export const markProductAsDeleted = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      logger.error('Product not found');
      throw new Error('Product not found');
    }
    product.deleted = true;
    await product.save();
    logger.info('Product marked as deleted successfully:', productId);
    await product.save();
  } catch (error) {
    logger.error('Error marking product as deleted:', error.message);
    throw new Error('Error marking product as deleted');
  }
};