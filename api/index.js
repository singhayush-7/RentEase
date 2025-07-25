import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';
import uploadRoute from './routes/upload.route.js';
import userRoutes from './routes/user.route.js'
import cookieParser from 'cookie-parser';
import { error } from 'console';
import { STATUS_CODES } from 'http';
import listingRouter from './routes/listing.route.js';
dotenv.config()
const app=express()
 app.use(cookieParser());
 app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', // ✅ frontend origin
    credentials: true,               // ✅ allow cookies
  })
)
 

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((error) => {
    console.error('❌ Connection error:', error);
  });
 app.use('/api/user',userRoutes );
 app.use('/api/auth', authRoutes);
app.use('/api/listing', listingRouter);
app.use('/api/upload', uploadRoute);
 app.use((err,req,res,next)=>{
  const statusCode=err.statusCode||500;
  const message =err.message|| 'internal server ERRor';
  return res.status(statusCode).json({
    success:false, 
    statusCode,
    message,
  })
 })
  
app.listen(3000,()=>{
 console.log('🚀 Server is running at http://localhost:3000');

})

      