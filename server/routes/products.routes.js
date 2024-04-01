import express from 'express';
import { deleteAd, getAllProducts,getProductById,getProductsByAuthor,updateAd,uploadProduct } from '../controllers/products.controller.js';

import protectRoute from '../middleware/protectRoute.js'

const router=express.Router();

router.get('/ads',getAllProducts)
router.get('/ads/:id',getProductById)
router.get('/ads/author/:authorId',/*protectRoute*/getProductsByAuthor)

router.post('/ads', /*protectRouteg*/uploadProduct);
router.put('/ads/update/:id',/*protectRouteg*/updateAd)
router.put('/ads/delete/:id',/*protectRouteg*/deleteAd)

export default router


//problem je u protovima nece da se posalje token na borwser jer su portovi razliciti
//protectRoute ne radi, ne vraca token