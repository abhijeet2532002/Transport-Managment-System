import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DB_Config = mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Connection failed', error));

export default DB_Config;