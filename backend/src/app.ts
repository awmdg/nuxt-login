// src/app.ts
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import { config } from "./config";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: config.corsOrigin,
      credentials: true,
    })
  );

  app.use("/api/auth", authRoutes);

  return app;
};
