import bcrypt from 'bcrypt';

const round = process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 10

export async function hashString(value:string): Promise<string> {
    try {
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