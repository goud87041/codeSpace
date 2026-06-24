import cors from 'cors';
import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

import connectDB from './config/db.js';
connectDB();

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// export default server;