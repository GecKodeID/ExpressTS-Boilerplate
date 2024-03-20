import express, { Request, Response, NextFunction } from 'express';
import { validateToken } from '../../misc/jwt';

export async function authenticate(request:Request, response:Response, next:NextFunction) {
    try {
        const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : ""
        const token = request.headers.authorization?.split(' ')[1];
        
        if (token) {
            const isAuthenticate = validateToken(token, JWT_SECRET);
            if (!isAuthenticate) {
                throw new Error("Unauthorized");
            }
            next();
        } else {
            throw new Error("Token is missing");
        }
    } catch (error) {
        console.log(error);
        response.status(401).json({ message: error });
    }
}