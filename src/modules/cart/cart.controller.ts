import { Request, Response } from "express";
import * as cartRepo from "./cart.repo"


export const addToCart = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id
        const { productId, quantity } = req.body
        const cart = await cartRepo.addToCart(userId, productId, quantity)
        res.status(201).json({ message: 'item added succesfully', data: cart })
    } catch (err) {
        res.status(500).json({ message: 'failed to add', error: err })
    }
}

export const getCart = async (req: Request, res: Response) => {
    const userId = req.user.id
    const cart = await cartRepo.getCartByUserId(userId)
    res.status(201).json({ message: 'cart fetched succesfully', data: cart })
}

export const removeItem = async (req: Request, res: Response) => {
    const userId = req.user.id
    const productId = req.body.productId
    const cart = await cartRepo.removeFromCart(userId, productId)
    res.status(201).json({ message: 'Item removed succesfully', data: cart })
}

export const updateQuantity = async (req: Request, res: Response) => {
    const userId = req.user.id
    const { productId, quantity } = req.body
    const cart = await cartRepo.updateQuantity(userId, productId, quantity)
    res.status(201).json({ message: 'Quantity updated succesfully', data: cart })
}


