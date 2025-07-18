import { Request, Response } from "express";
import { userModel } from "./user.model";
import bcrypt from 'bcrypt'
import httpErrors from "http-errors";
import * as userRepo from "./user.repo"
import { createToken } from "../../utils/jwt";
import { error } from "console";


export const register = async (req: Request, res: Response) => {
    try {
        const body = req.body
        const hashedPassword = await bcrypt.hash(body.password, 10)
        body.password = hashedPassword
        const userDoc = await userRepo.createUser(body)
        const user = userDoc.toObject()
        user.token = await createToken({
            id: user._id,
            role: user.role
        })
        res.status(201).json({ message: 'Registered succesfully', data: user })
    } catch (err) {
        res.status(500).json({ message: 'Registered failed', error: err })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const user = await userRepo.findByEmail(req.body.email)
        if (!user) {
            return res.status(401).json({ message: 'user not exist' })
        }
        if (!(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        user.token = await createToken({
            id: user._id,
            role: user.role
        })
        res.status(201).json({ message: 'Login succesfully', user })
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err })
    }
}