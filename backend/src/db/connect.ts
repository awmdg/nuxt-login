// src/db/connect.ts
import mongoose from "mongoose";
import { config } from "../config";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  }
};
