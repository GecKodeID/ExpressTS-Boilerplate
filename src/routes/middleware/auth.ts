import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export async function JWTauth(request:Request, response:Response, next:NextFunction) {
    const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : ""
    const token = request.headers.authorization?.split(' ')[1];
    
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return response.status(403).json({ message: 'Failed to authenticate' });
        }
        request.body.userId = (decoded as any).userId; // Attach user ID to request body
        next();
        });
    } else {
        response.status(401).json({ message: 'Unauthorized' });
    }
}