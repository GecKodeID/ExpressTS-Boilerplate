import bcrypt from 'bcrypt';
import env from 'dotenv';
import db from '../database/database';
import { addUserQuery } from '../queries/user';

env.config();

const round = process.env.BCRYPT_SALT_ROUND ? parseInt(process.env.BCRYPT_SALT_ROUND) : 10

export async function hashString(value:string): Promise<string> {
    try {
        // reminder: to high salt round cause slow hashing, impacting performance
        const hashedString = await bcrypt.hash(value, round);
        return hashedString;
    } catch (error) {
        console.log(error);
        return "failed to hash";
    }
}

export async function compareHashString(hashValue:string, value:string): Promise<boolean> {
    try {
        const compareResult = await bcrypt.compare(value, hashValue);
        return compareResult;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function generateNewUser() {
    try {
        console.log("check users availability...");
        const totalUser = await db.one(`SELECT COUNT(*) as total FROM users`);
        if (totalUser.total > 0) {
            console.log("user not empty, stop process");
            return;
        }

        const getRoles = await db.one(`SELECT role_id FROM userroles WHERE role_name='admin'`);

        const payload = {
            username: process.env.DEFAULT_USERNAME ? process.env.DEFAULT_USERNAME : "admin",
            email: process.env.DEFAULT_EMAIL ? process.env.DEFAULT_EMAIL : "admin@tes.com",
            password: process.env.DEFAULT_PASSWORD ? process.env.DEFAULT_PASSWORD : "administrator",
            name: process.env.DEFAULT_NAME ? process.env.DEFAULT_NAME : "administrator",
            phone: process.env.DEFAULT_PHONE ? process.env.DEFAULT_PHONE : "62555777882",
            role_id: getRoles.role_id
        }
        const createUser = await addUserQuery(payload);
        console.log(createUser.message);
        console.table(payload);
        return;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}