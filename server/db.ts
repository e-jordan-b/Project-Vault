import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

export default function connectToDB() {
    mongoose.connect(process.env.ATLAS_URL!);
    const db: mongoose.Connection = mongoose.connection;
    db.on('error', (error) => console.error(error));
    db.on('open', () => console.log('Connected to Database'));
}