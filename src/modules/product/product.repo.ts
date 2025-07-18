import { match } from "assert";
import { productModel } from "./product.model";
import httpErrors from "http-errors"

//to create the product
export const createProduct = async (body): Promise<any> => {
    try {
        const product = await new productModel(body).save()
        return product
    } catch (err: any) {
        if (err.code == 11000) {
            throw httpErrors(409, 'Similar record already exist')
        } else {
            throw err
        }
    }
}

//to fetch single product
export const getProductById = async (id: string): Promise<any> => {
    return await productModel.findById(id).lean().exec()
}

//to get product list
export const getProductList = async (filter: any): Promise<any> => {
    const result = {} as any

    const searchCondition: any = {};
    if (filter.search) {
        searchCondition.$or = [
            { name: { $regex: filter.search, $options: 'i' } },
            { category: { $regex: filter.search, $options: 'i' } }
        ];
    }

    result.list = await productModel.find(searchCondition).skip(filter.skip).limit(filter.limit)  //fetching pagination data
    result.totalProducts = await productModel.countDocuments(); //fetching total number of documents
    result.count = result.list.length 
    return result
}

//to update product
export const updateProduct = async (id : string, data: any): Promise<any> => {
    return await productModel.findByIdAndUpdate(id, data, { new: true })
}

//to delete product
export const deleteProduct = async (id: string): Promise<any> => {
    return await productModel.findByIdAndDelete(id).lean()
}