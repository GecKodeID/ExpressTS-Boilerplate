import { JwtPayload } from "../types/jwt-payload";
import jwt, { decode } from 'jsonwebtoken';

export function createToken(payload:JwtPayload, secret:string, duration:string): string {
    try {
        console.log(payload);
        const token = jwt.sign(payload, secret, {
            expiresIn: duration
        });

        return token;
    } catch (error) {
       console.log(error);
       return "Failed to sign jwt"; 
    }
}