// src/controllers/authController.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import { config } from '../config';

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const newUser: IUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user: IUser | null = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, error: 'User not found' });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ success: false, error: 'Invalid credentials' });

        // Generate access token (short-lived)
        const accessToken = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });

        // Generate refresh token (long-lived)
        const refreshToken = jwt.sign({ id: user._id }, config.refreshTokenSecret, { expiresIn: '7d' });

        res.status(200).json({ success: true, accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ success: false, error: (error as Error).message });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.body.refreshToken;

    try {
        const decoded = jwt.verify(refreshToken, config.refreshTokenSecret) as { id: string };

        // Check if user exists (optional, depending on your application flow)
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Generate new access token
        const accessToken = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ success: true, accessToken });
    } catch (error) {
        res.status(401).json({ success: false, error: 'Invalid or expired refresh token' });
    }
};
