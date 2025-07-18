import { orderModel } from "./order.model";

export const createOrder = async (body): Promise<any> => {
    console.log(body)
    const user = await new orderModel(body).save()
    return user
}

export const getOrderByUserId = async (userId: string) => {
    return await orderModel.find({ userId }).populate('items.productId')
}

export const updateOrderStatus = async (orderId: string, status: string) => {
    return await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
    )
}


