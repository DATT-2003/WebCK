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
const getRoomById = async (req: any, res: any) => {
    const { id } = req.params; // Lấy ID từ URL
    try {
        const room = await UserModel.findById(id); // Tìm phòng theo ID
        if (!room) {
            return res.status(404).json({ message: "Room not found!" });
        }
        res.status(200).json({ data: room });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
const updateRoom = async (req: any, res: any) => {
    const { id } = req.params;
    const updates = req.body; // Lấy dữ liệu từ client
    try {
        const updatedRoom = await UserModel.findByIdAndUpdate(id, updates, { new: true }); // Cập nhật và trả về dữ liệu mới
        if (!updatedRoom) {
            return res.status(404).json({ message: 'Room not found!' });
        }
        res.status(200).json({ message: 'Room updated successfully!', data: updatedRoom });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
const deleteRoom = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const room = await UserModel.findByIdAndDelete(id);
        if (!room) {
            throw new Error('Room not found!');
        }
        res.status(200).json({
            message: 'Room deleted successfully!',
        });
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
        });
    }
};
export { create, getAllRooms, getRoomById, updateRoom, deleteRoom }