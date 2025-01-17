import { Router } from 'express';
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import userRouter from './src/routers/room'
import billRouter from './src/routers/bill';
import cors from 'cors';
dotenv.config();


const PORT = process.env.PORT || 3001;
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.hawoi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const app = express();
app.use(express.json())
app.use(cors());
app.use('/auth', userRouter);
app.use('/bill', billRouter);

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL)
        console.log(`Connect to DB successfully!!!`)
    } catch (error) {
        console.log(`Can't connect to DB${error}`)
    }
};
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is starting at http://localhost:${PORT}`);
        });
    }).catch((error) => {
        console.log(error)
    })

