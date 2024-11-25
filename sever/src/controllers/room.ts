import UserModel from "../models/RoomModel";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config();

const create = async (req: any, res: any) => {
    const body = req.body;
    const { name } = body
    try {
        // const user = await UserModel.findOne({ name })
        // if (user) {
        //     throw new Error(`Tài khoản đã tồn tại`)
        // }
        const newUser = new UserModel(body)
        await newUser.save()

        res.status(200).json({
            message: 'Create',
            data: newUser,
        })
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
};
export { create }