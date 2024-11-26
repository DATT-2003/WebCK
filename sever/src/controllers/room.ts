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
        const newRoom = new UserModel(body)
        await newRoom.save()

        res.status(200).json({
            message: 'Create',
            data: newRoom,
        })
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        })
    }
};
const getAllRooms = async (req: any, res: any) => {
    try {
        // Lấy tất cả các phòng từ MongoDB
        const rooms = await UserModel.find();

        res.status(200).json({
            message: 'Room list fetched successfully!',
            data: rooms, // Trả về dữ liệu phòng
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
};
export { create, getAllRooms }