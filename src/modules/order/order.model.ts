import { model, Schema } from "mongoose"
import { IOrder } from "./order.interface"

const userSchema = new Schema<IOrder>({
    userId :  { type: Schema.Types.ObjectId, ref : 'user', required: true },
    items:[
        {
            productId : {type: Schema.Types.ObjectId, ref : 'product', required : true},
            quantity : {type : Number, required : true}
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
})

const orderTable = 'orders'
export const orderModel = model<IOrder>(orderTable, userSchema, orderTable)