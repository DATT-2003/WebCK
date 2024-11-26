import RoomModel from "../models/RoomModel";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config();

const create = async (req: any, res: any) => {
    const body = req.body;
    const { name } = body
    try {
        const newRoom = new RoomModel(body)
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
        const rooms = await RoomModel.find();

        res.status(200).json({
            message: 'Room list fetched successfully!',
            data: rooms,
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
};
const getRoomById = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const room = await RoomModel.findById(id);
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
        const updatedRoom = await RoomModel.findByIdAndUpdate(id, updates, { new: true }); // Cập nhật và trả về dữ liệu mới
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
        const room = await RoomModel.findByIdAndDelete(id);
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