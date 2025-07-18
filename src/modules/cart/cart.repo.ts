import { cartModel } from "./cart.model"

export const addToCart = async (userId: string, productId: string, quantity: number): Promise<any> => {
    try {
        let cart = await cartModel.findOne({ userId })
        if (cart) {
            const item = await cart.items.find(item => item.productId === productId);
            if (item) {
                item.quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
            await cart.save()
        } else {
            cart = await cartModel.create({
                userId,
                items: [{ productId, quantity }]
            })
        }
        return cart
    } catch (err: any) {
        throw err;
    }
}

export const getCartByUserId = async (userId: string) => {
    return await cartModel.findOne({ userId }).lean()
}

export const removeFromCart = async (userId: string, productId: String) => {
    const cart = await cartModel.findOneAndUpdate(
        { userId },
        { $pull: { items: { productId } } }
    )
    return cart
}

export const updateQuantity = async (userId: string, productId: string, quantity: number) => {
    return await cartModel.findOneAndUpdate(
        { userId, 'items.productId': productId },
        { $set: { 'items.$.quantity': quantity } },
        { new: true }
    );
}

export const emptyCart = async (userId: string) => {
    return await cartModel.findOneAndUpdate(
        { userId },
        { $set: { items: [] } }
    )
}