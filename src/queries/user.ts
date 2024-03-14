import db from "../database/database";
import { RequestAddUserModel } from "../model/RequestAddUser.model";
import { RequestUpdateUserModel } from "../model/RequestUpdateUser.model";
import { Query } from "../types/query-params";
import { GeneralResponse } from "../types/response-general";
import { ResponseGeneralList } from "../types/response-general-list";
import { hashString } from "../misc/utils";
import { UserItem } from "../model/UserItem.model";

enum UserColumn {
    ID = "id",
    USERNAME = "username",
    EMAIL = "email",
    NAME = "name",
    ADDRESS = "address",
    PHONE = "phone",
    CREATED_BY = "created_by",
    UPDATED_BY = "updated_by"
}

function isUserColumn(value: string): value is UserColumn {
    const usersColumn: string[] = Object.values(UserColumn);
    return usersColumn.includes(value);
}

export async function listUsersQuery(request:Query): Promise<ResponseGeneralList> {
    try {
        let query = `SELECT 
        user_id, 
        username, 
        email, 
        name, 
        address, 
        phone, 
        profile_picture, 
        created_at, 
        created_by, 
        updated_at, 
        updated_by FROM users `;

        let count = 0;
        let params = [];
        let cmdQuery = "";
        if (request.search) {
            count++;
            cmdQuery += `WHERE username ILIKE '%$${count}%'`
            params.push(request.search)
        }

        const countData = await db.one(`SELECT COUNT(*) AS total FROM users ${cmdQuery}`);
        
        const sortBy = request.sort_by ? request.sort_by : "username";
        request.sort = request.sort?.toLowerCase() === "asc" ? "ASC" : "DESC";
        cmdQuery += `ORDER BY ${isUserColumn(sortBy) ? sortBy : "username"} ${request.sort}`;

        count++;
        request.limit = request.limit ? request.limit : 10;
        cmdQuery += ` LIMIT $${count}`;
        params.push(request.limit);

        count++;
        request.page = request.page ? request.page : 1;
        cmdQuery += ` OFFSET $${count}`;
        let offset = request.page > 1 ? (request.page - 1) * request.limit : 0;
        params.push(offset);
        
        const items = await db.any(query+cmdQuery, params);
        return {
            limit: request.limit,
            page: request.page,
            total: parseInt(countData.total),
            order: request.sort,
            items: items
        }
      } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
      }
}

export async function getUserByIdQuery(id:string): Promise<UserItem> {
    try {
        const item = await db.one(`SELECT 
        user_id, 
        username, 
        email, 
        name, 
        address, 
        phone, 
        profile_picture, 
        created_at, 
        created_by, 
        updated_at, 
        updated_by FROM users WHERE user_id=$1`, id);
        return {
            id: item.id,
            username: item.username,
            email: item.email,
            name: item.name,
            address: item.address,
            phone: item.phone,
            profile_picture: item.profile_picture,
            created_at: item.created_at,
            created_by: item.created_by,
            updated_at: item.updated_at,
            updated_by: item.updated_by
        };
      } catch (error: any) {
        console.log(error);

        throw new Error(error.message);
      }
}

export async function addUserQuery(request:RequestAddUserModel): Promise<GeneralResponse> {
    try {
        console.log("start addUserQuery function...");
        console.log("proceed hash the password");
        const hashedPassword = await hashString(request.password);
        if (hashedPassword === "failed to hash") {
            throw new Error("Failed to hashing an password");
        }

        let query = "INSERT INTO users ";
        let column = ['username', 'email', 'password', 'name', 'phone', 'role_id'];
        let valueParam = ['$1', '$2', '$3', '$4', '$5', '$6'];
        let param: string[] = [request.username, request.email, hashedPassword, request.name, request.phone, request.role_id];
        let count = valueParam.length;

        if (request.address) {
            count++;
            column.push('address');
            valueParam.push(`$${count}`);
            param.push(request.address ? request.address : "");    
        }

        if (request.profile_picture) {
            count++;
            column.push('profile_picture');
            valueParam.push(`$${count}`);
            param.push(request.profile_picture ? request.profile_picture : "");
        }

        if (request.created_by) {
            count++;
            column.push('created_by');
            valueParam.push(`$${count}`);
            param.push(request.created_by ? request.created_by : "");
        }

        if (request.created_at) {
            count++;
            column.push('created_at');
            valueParam.push(`$${count}`);
            param.push(request.created_at ? request.created_at : "");
        }

        query += `(${column.join(',')}) VALUES (${valueParam.join(',')}) RETURNING user_id`

        console.log("DB: begin save user data to DB...");
        const data = await db.one(query, param);
        console.log("finish saving user data");
        return {
            id: data,
            message: "successfuly create user"
        };
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}

export async function updateUserQuery(request:RequestUpdateUserModel, id: string): Promise<GeneralResponse> {
    try {
        let query = "UPDATE users SET ";
        let column = [];
        let param: string[] = [];
        let count = column.length;

        if (request.username) {
            count++;
            column.push(`username=$${count}`);
            param.push(request.username ? request.username : "");
        }

        if (request.email) {
            count++;
            column.push(`email=$${count}`);
            param.push(request.email ? request.email : "");
        }

        if (request.password) {
            count++;
            column.push(`password=$${count}`);
            const hashedPassword = await hashString(request.password ? request.password : "");
            if (hashedPassword === "failed to hash") {
                throw new Error("Failed to hashing an password");
            }
            param.push(hashedPassword);
        }

        if (request.role_id) {
            count++;
            column.push(`role_id=$${count}`);
            param.push(request.role_id ? request.role_id : "");
        }

        if (request.name) {
            count++;
            column.push(`name=$${count}`);
            param.push(request.name ? request.name : "");
        }

        if (request.address) {
            count++;
            column.push(`address=$${count}`);
            param.push(request.address ? request.address : "");
        }

        if (request.phone) {
            count++;
            column.push(`phone=$${count}`);
            param.push(request.phone ? request.phone : "");
        }

        if (request.profile_picture) {
            count++;
            column.push(`profile_picture=$${count}`);
            param.push(request.profile_picture ? request.profile_picture : "");
        }

        if (request.updated_at) {
            count++;
            column.push(`updated_at=$${count}`);
            param.push(request.updated_at ? request.updated_at : "");
        }

        count++;
        column.push(`updated_by=$${count}`);
        param.push(request.updated_by ? request.updated_by : "");

        count++
        param.push(id);
        query += `${column.join(',')} WHERE user_id=$${count} RETURNING user_id`;

        const updatedItem = await db.one(query, param);

        return {
            id: updatedItem.id,
            message: "successfuly update user"
        }
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}

export async function deleteUserQuery(id:string): Promise<GeneralResponse> {
    try {
        await db.none('DELETE FROM users WHERE user_id = $1', id);
        return {
            id: id,
            message: "successfuly delete user"
        }
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }
}