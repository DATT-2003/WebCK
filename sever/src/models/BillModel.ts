import mongoose, { Schema } from "mongoose";

const BillScheme = new Schema({
    roomName: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

const BillModel = mongoose.model('bill', BillScheme);
export default BillModel;
