import express from "express";
import { addToCart, getCart, removeItem, updateQuantity } from "./cart.controller";

const cartRouter = express.Router();

cartRouter.post('/add', addToCart)
cartRouter.get('/', getCart) 
cartRouter.put('/remove', removeItem) 
cartRouter.put('/update', updateQuantity) 

export default cartRouter
