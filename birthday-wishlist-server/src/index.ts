import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import dotenv from 'dotenv';
// import { userRouter } from './routes/userRoutes';
// import { wishlistRouter } from './routes/wishlistRoutes';
// import { giftRouter } from './routes/giftRoutes';

import router from '../routers/index'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

// Middleware
app.use(helmet());
app.use(cors(
  ({
    origin: "http://localhost:3000",
    credentials: true,
  })
));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

app.get('/', (req, res) => {
  res.send('Birthday Wishlist API is running');
});


app.use('/', router());





app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(500).json({
    error: 'Internal server error',
    message: 'An error occured on the server'
  })
})



// 404 error handler

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  // mongoose.Promise = Promise;
  mongoose.connect(MONGO_URI);
  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  });
});

export default app;

