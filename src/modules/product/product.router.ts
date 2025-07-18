import express from "express";
import { createProduct,deleteProduct, getProductById, getProductlist, updateProduct } from "./product.controller";

const router = express.Router();

router.post('/create', createProduct) 
router.get('/single', getProductById)  
router.get('/list', getProductlist)  
router.put('/update',updateProduct)
router.delete('/delete',deleteProduct)

export default router
