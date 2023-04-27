import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(`${process.env.ATLAS_URL}`);

const db: mongoose.Connection = mongoose.connection;

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

export default mongoose;
