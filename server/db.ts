import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const { NODE_ENV } = process.env;

console.log(
  NODE_ENV !== 'CYPRESS' ? process.env.ATLAS_URL : process.env.TEST_DB
);

export default function connectToDB() {
  mongoose.connect(
    NODE_ENV === 'CYPRESS' ? process.env.TEST_DB! : process.env.ATLAS_URL!
  );
  const db: mongoose.Connection = mongoose.connection;
  db.on('error', (error) => console.error(error));
  db.on('open', () => console.log('Connected to Database'));
}
