import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from 'dotenv';
import { JwtPayload } from '../../types/jwt-payload';

env.config();

export async function authenticate(request:Request, response:Response, next:NextFunction) {
    try {
        const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : ""
        const token = request.headers.authorization?.split(' ')[1];
        
        if (token) {
            jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
                const tokenResponse = decoded as JwtPayload;
                if (err) {
                    throw new Error("Failed to verify the JWT");
                }
                response.locals.jwt = tokenResponse;
                next();
            });
        } else {
            throw new Error("Token is missing");
        }
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return response.status(401).json({ message: error.message });
        }
        return response.status(500).json({ message: "somenthing went wrong" });
    }
}