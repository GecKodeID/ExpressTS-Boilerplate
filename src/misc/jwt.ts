import { JwtPayload } from "../types/jwt-payload";
import jwt from 'jsonwebtoken';

export function createToken(payload:JwtPayload, secret:string, duration:string): string {
    try {
        const token = jwt.sign(payload, secret, {
            expiresIn: duration
        });

        return token;
    } catch (error) {
       console.log(error);
       return "Failed to sign jwt"; 
    }
}

export function validateToken(token:string, secret:string): boolean {
    try {
        jwt.verify(token, secret, (err, decoded) => {
            console.log("JWT DECODE ------------------->",decoded);
            if (err) {
                throw new Error("Failed to verify the JWT");
            }
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}