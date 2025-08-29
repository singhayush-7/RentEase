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
 import path from 'path';
dotenv.config()
const __dirname=path.resolve();
const app=express()
 app.use(cookieParser());
 app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",              // local frontend
  "https://rentease-90oe.onrender.com"  // deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

 

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log(' Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Connection error:', error);
  });
 app.use('/api/user',userRoutes );
 app.use('/api/auth', authRoutes);
app.use('/api/listing', listingRouter);
app.use('/api/upload', uploadRoute);
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

 app.use((err,req,res,next)=>{
  const statusCode=err.statusCode||500;
  const message =err.message|| 'internal server ERRor';
  return res.status(statusCode).json({
    success:false, 
    statusCode,
    message,
  })
 })
  
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});


       