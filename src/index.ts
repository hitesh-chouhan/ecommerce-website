import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './modules/user/user.router'
import productRoutes from './modules/product/product.router'
import cartRoutes from './modules/cart/cart.router'
import orderRoutes from './modules/order/order.router'

import { jwtAuthMiddleware } from './utils/jwt'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000

//middleware
app.use(cors());
app.use(express.json());

//Router
app.use('/user', userRoutes)
app.use('/product', jwtAuthMiddleware, productRoutes)
app.use('/cart', jwtAuthMiddleware, cartRoutes)
app.use('/order', jwtAuthMiddleware, orderRoutes)

//connect to db
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.error('MongoDB connection error :', err)
    })