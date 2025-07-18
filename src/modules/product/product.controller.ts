import { Request, Response } from "express";
import httpErrors from "http-errors"
import * as productRepo from "./product.repo"

export const createProduct = async (req: Request, res: Response) => {
    try {
        if(req.user.role !== 'admin'){
            throw httpErrors(403, 'You dont have access to add a product')  //mantaining the accebility for admin and customer
        }
        req.body.createdBy = req.user.id  //getting user details from the token/jwt
        const product = await productRepo.createProduct(req.body)
        res.status(201).json({ message: 'Product created succesfully', data: product })
    } catch (err) {
        res.status(500).json({ message: 'Failed to create product', error: err })
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await productRepo.getProductById(req.query.id as string)
        if (!product) {
            throw httpErrors(404, 'product not found')
        }
        res.status(201).json({ message: 'Product fetched succesfully', product })
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch product', error: err })
    }
}

export const getProductlist = async (req: Request, res: Response) => {
    try {
        const filter = {} as any
        filter.page = parseInt(req.query.page as string) || 1
        filter.limit = parseInt(req.query.limit as string) || 10
        filter.skip = (filter.page - 1) * filter.limit
        const products = await productRepo.getProductList(filter)
        res.status(200).json({
            success: true,
            message: "Product list fetched successfully",
            data: products.list,
            count: products.count,
            total: products.total
        })
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch product list', error: err })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        if(req.user.role !== 'admin'){
            throw httpErrors(403, 'You dont have access to update a product')
        }
        const product = await productRepo.updateProduct(req.query.id as string, req.body)
        if(!product){
            return res.status(404).json({message : 'Product not fount'})
        }
        res.status(201).json({ message: 'Product updated succesfully', data: product })
    } catch (err) {
        res.status(500).json({ message: 'Failed to update product', error: err })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        if(req.user.role !== 'admin'){
            throw httpErrors(403, 'You dont have access to delete a product')
        }
        const product = await productRepo.deleteProduct(req.query.id as string)
        if(!product){
            return res.status(404).json({message : 'Product not fount'})
        }
        res.status(201).json({ message: 'Product deleted succesfully', data: product })
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete product', error: err })
    }
}

