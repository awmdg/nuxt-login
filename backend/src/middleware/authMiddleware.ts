// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ success: false, error: 'Access token not provided' });
    }

    try {
        const decoded = jwt.verify(accessToken, config.jwtSecret) as { id: string };
        req.userId = decoded.id; // Attach userId to request object for use in subsequent middleware or route handlers
        next();
    } catch (error) {
        return res.status(403).json({ success: false, error: 'Invalid access token' });
    }
};
