import express from "express";
import { createOrder, getOrder, updateOrderStatus } from "./order.controller";

const orderRouter = express.Router();

orderRouter.post('/', createOrder)  
orderRouter.get('/', getOrder)  
orderRouter.put('/', updateOrderStatus)  

export default orderRouter
