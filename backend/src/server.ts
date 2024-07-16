// src/server.ts
import { createApp } from "./app";
import { connectDB } from "./db/connect";
import { config } from "../src/config";
import dotenv from "dotenv";

dotenv.config();

const app = createApp();
const port = config.port;

connectDB();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
