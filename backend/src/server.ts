// src/server.ts
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from '../src/routes/authRoutes';
import { config } from './config';

const app = express();
const port = config.port;

mongoose.connect(config.mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',  // Replace with your frontend URL
    credentials: true,
}));

app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
