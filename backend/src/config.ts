import dotenv from "dotenv";

dotenv.config();

export const config = {
  mongoURI: process.env.MONGO_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
  port: process.env.PORT ? parseInt(process.env.PORT) : 5000,
  corsOrigin: process.env.CORS_ORIGIN as string,
};
