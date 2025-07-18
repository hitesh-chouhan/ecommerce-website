import { Request, Response } from "express";
import { emptyCart, getCartByUserId } from "../cart/cart.repo";
import { getProductById } from "../product/product.repo";
import * as orderRepo from "./order.repo"


export const createOrder = async (req: Request, res: Response) => {
    try {
        let body = {} as any
        const userId = req.user.id   //extracted from token
        const cart = await getCartByUserId(userId)
        if (!cart || cart.items.length === 0) {
            throw new Error('cart is empty')
        }

        //caluclate total price 
        let totalPrice = 0;
        for (const item of cart.items) {
            const product = await getProductById(item.productId)
            if (!product || product.stock < item.quantity) {
                throw new Error(`Product ${item.productId} is not available for now`)
            }
            totalPrice += product.price * item.quantity
        }

        //placing the order
        body.totalPrice = totalPrice
        body.items = cart.items
        body.userId = userId
        const order = await orderRepo.createOrder(body)

        //empty the cart
        await emptyCart(userId);  //empty the cart after placing the order

        res.status(201).json({ message: 'Order placed succesfully', data: order })
    } catch (err) {
        res.status(500).json({ message: 'Order failed', error: err })
    }
}

export const getOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id
        const order = await orderRepo.getOrderByUserId(userId)
        if (!order) {
            res.status(404).json({ message: 'Not any order placed yet', data: order })
        }
        res.status(201).json({ message: 'Orders fetched succesfully', data: order })
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch orders', error: err })
    }
}

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const orderId = req.body.orderId
        const status = req.body.status
        const order = await orderRepo.updateOrderStatus(orderId, status)
        res.status(201).json({ message: 'Orders status updated succesfully', data: order })
    } catch (err) {
        res.status(500).json({ message: 'Failed to update status', error: err })
    }
}
