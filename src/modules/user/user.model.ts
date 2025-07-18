import mongoose, { model, Schema } from "mongoose"
import { Iuser } from "./user.interface"

const userSchema = new Schema<Iuser>({
    name: { type: String },
    email: { type: String, required: true, unique : true },
    password: { type: String },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
})

const userTable = 'user'
export const userModel = model<Iuser>(userTable, userSchema, userTable)