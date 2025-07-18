import { userModel } from "./user.model";
import { Iuser } from "./user.interface";
import httpErrors from "http-errors"

export const createUser = async (body): Promise<any> => {
    try {
        const user = await new userModel(body).save()
        return user
    } catch (err: any) {
        if (err.code == 11000) {
            throw httpErrors(409, 'Similar record already exist')
        } else {
            throw err
        }
    }
}


export const findByEmail = async (email: string): Promise<any> => {
    return await userModel.findOne({ email }).lean().exec()
}