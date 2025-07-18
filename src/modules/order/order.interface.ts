import { ObjectId } from "mongoose"

interface OrderItem{
    productId: ObjectId,
    quantity: number
}

export interface IOrder extends Document {
    userId : ObjectId
    items : OrderItem[]
    totalPrice : number
    status : 'pending' | 'shipped' | 'delivered'
    createdAt : Date
}