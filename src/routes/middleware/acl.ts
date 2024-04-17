import { NextFunction, Request, Response } from "express";
import db from "../../database/database";

export async function checkACLUser(request:Request, response:Response, next:NextFunction, acl_name: string) {
    try {
        const { jwt } = response.locals;

        const result = await db.one(`
		SELECT COUNT(1)
		FROM acl 
		JOIN users ON acl.role_id = users.role_id 
		WHERE users.user_id = $1 and acl.name = $2
		`, [jwt.id, acl_name]);

        if (result.count == 0) {
            throw new Error('You don\'t have permission to access this endpoint');
        }
        next();

    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return response.status(401).json({ message: error.message });
        }
        return response.status(500).json({ message: 'Something went wrong' });
    }
}