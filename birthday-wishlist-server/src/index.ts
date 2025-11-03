import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import path from "path";

import router from "../routers/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

const allowedOrigins = [
  // "https://your-frontend-name.onrender.com", // your deployed frontend URL
  "http://localhost:3000", // optional, for local testing
  "http://localhost:3001",
];

const origins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://wishlist-application-frontend.onrender.com",
];

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORs"));
      }
    },
    credentials: true
  }),
);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// for my images

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

app.get("/", (req, res) => {
  res.send("Birthday Wishlist API is running");
});

app.use("/", router());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource could not be found",
  });
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({
    error: "Internal server error",
    message: "An error occured on the server",
  });
});

// 404 error handler

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  // mongoose.Promise = Promise;
  mongoose.connect(MONGO_URI);
  mongoose.connection.on("error", (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(1);
  });
});

export default app;
