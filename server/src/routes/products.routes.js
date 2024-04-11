import express from 'express';
import { getAllProductsController,getProductByIdController,getProductsByAuthorController, uploadProduct, updateProductController, markProductAsDeletedController } from "../controllers/products.controller.js"

//import {protectRoute} from '../../middleware/protectRoute.js'

const productRouter=express.Router();

productRouter.get('/ads',getAllProductsController)
productRouter.get('/ads/:id',getProductByIdController)
productRouter.get('/ads/author/:authorId',/*protectRoute*/getProductsByAuthorController)

productRouter.post('/ads', /*protectRouteg*/uploadProduct);
productRouter.put('/ads/update/:id',/*protectRouteg*/updateProductController)
productRouter.put('/ads/delete/:id',/*protectRouteg*/markProductAsDeletedController)

export {productRouter}
