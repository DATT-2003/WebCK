import BillModel from "../models/BillModel";
import RoomModel from "../models/RoomModel";

// Tạo Bill
const createBill = async (req: any, res: any) => {
    const { roomId, customerName, bookingDate, daysBooked } = req.body;

    try {
        const room = await RoomModel.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: "Room not found!" });
        }

        // Tính tổng tiền
        const totalAmount = room.price * daysBooked;

        const newBill = new BillModel({
            roomName: room.name,
            customerName,
            bookingDate,
            price: room.price,
            totalAmount,
        });

        await newBill.save();

        res.status(200).json({
            message: 'Bill created successfully!',
            data: newBill,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export { createBill };
