import express from 'express';
import { getAllProductsController,getProductByIdController,getProductsByAuthorController, uploadProduct, updateProductController, markProductAsDeletedController } from "../controllers/products.controller.js"

const productRouter=express.Router();

productRouter.get('/ads',getAllProductsController)
productRouter.get('/ads/:id',getProductByIdController)
productRouter.get('/ads/author/:authorId',getProductsByAuthorController)

productRouter.post('/ads',uploadProduct);
productRouter.put('/ads/update/:id',updateProductController)
productRouter.put('/ads/delete/:id',markProductAsDeletedController)

export {productRouter}
