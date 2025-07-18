import { model, Schema } from "mongoose"
import { ICart } from "./cart.interface"

const userSchema = new Schema<ICart>({
    userId: { type: String },
    items: [
        {
            productId: { type: String, required: true },
            quantity: { type: Number, default: 1 }
        }
    ]
})

const cartTable = 'cart'
export const cartModel = model<ICart>(cartTable, userSchema, cartTable)