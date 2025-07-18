import mongoose, { model, Schema } from "mongoose"
import { IProduct } from "./product.interface"

const userSchema = new Schema<IProduct>({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true},
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    category: { type: String, required: true },
    image: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }
},
    { timestamps: true })

const productTable = 'product'
export const productModel = model<IProduct>(productTable, userSchema, productTable)