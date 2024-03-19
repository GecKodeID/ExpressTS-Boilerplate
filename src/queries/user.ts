import db from "../database/database";
import { RequestAddUserModel } from "../model/RequestAddUser.model";
import { RequestUpdateUserModel } from "../model/RequestUpdateUser.model";
import { Query } from "../types/query-params";
import { GeneralResponse } from "../types/response-general";
import { ResponseGeneralList } from "../types/response-general-list";
import { hashString } from "../utils";

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

export async function listUsers(request:Query): Promise<ResponseGeneralList> {
    try {
        let query = `SELECT 
        id, 
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
        if (request.search || request.search !== "") {
            count++;
            cmdQuery += `WHERE username ILIKE '%$${count}%'`
            params.push(request.search)
        }

        if (request.sort || request.sort !== "") {
            count++;
            const sortBy = request.sort_by ? request.sort_by : "username";
            request.sort = request.sort?.toLowerCase() === "asc" ? "ASC" : "DESC";
            cmdQuery += `ORDER BY ${isUserColumn(sortBy) ? sortBy : "username"} ${request.sort}`;
        }

        const countData = await db.one(`SELECT COUNT(*) AS total FROM users ${cmdQuery}`);
        
        const items = await db.any(query+cmdQuery, params);
        return {
            limit: request.limit,
            page: request.page,
            total: countData,
            order: request.sort,
            item: items
        }
      } catch (error) {
        console.log(error);
        return {
            message: "something went wrong"
        }
      }
}

export async function getUserById(id:string) {
    try {
        const item = await db.one(`SELECT 
        id, 
        username, 
        email, 
        name, 
        address, 
        phone, 
        profile_picture, 
        created_at, 
        created_by, 
        updated_at, 
        updated_by FROM users WHERE id=$1`, id);
        return {
            message: "successfully retrive the data",
            item
        };
      } catch (error) {
        console.log(error);
        return {
            message: "something went wrong"
        }
      }
}

export async function addUserQuery(request:RequestAddUserModel): Promise<GeneralResponse> {
    try {
        const hashedPassword = await hashString(request.password);
        if (hashedPassword === "failed to hash") {
            throw new Error("Failed to hashing an password");
        }

        let query = "INSERT INTO users ";
        let column = ['username', 'email', 'password', 'name', 'phone', 'role_id'];
        let valueParam = ['$1', '$2', '$3', '$4', '$5', '$6'];
        let param: string[] = [request.username, request.email, hashedPassword, request.name, request.phone, request.role_id];
        let count = valueParam.length;

        if (request.address !== "" || request.address) {
            count++;
            column.push('address');
            valueParam.push(`$${count}`);
            param.push(request.address ? request.address : "");    
        }

        if (request.profile_picture !== "" || request.profile_picture) {
            count++;
            column.push('profile_picture');
            valueParam.push(`$${count}`);
            param.push(request.profile_picture ? request.profile_picture : "");
        }

        if (request.created_at !== "" || request.created_at) {
            count++;
            column.push('created_at');
            valueParam.push(`$${count}`);
            param.push(request.created_at ? request.created_at : "");
        }

        if (request.created_by !== "" || request.created_by) {
            count++;
            column.push('created_by');
            valueParam.push(`$${count}`);
            param.push(request.created_by ? request.created_by : "");
        }

        query += `(${column.join(',')}) VALUES (${valueParam.join(',')}) RETURNING id`

        const data = await db.one(query, param);
        return {
            id: data,
            message: "successfuly create user"
        };
    } catch (error) {
        console.log(error);
        return {
            message: "something went wrong"
        };
    }
}

export async function updateUser(request:RequestUpdateUserModel): Promise<GeneralResponse> {
    try {
        let query = "UPDATE users SET ";
        let column = [];
        let param: string[] = [];
        let count = column.length;

        if (request.username || request.username !== "") {
            count++;
            column.push(`username=$${count}`);
            param.push(request.username ? request.username : "");
        }

        if (request.email || request.email !== "") {
            count++;
            column.push(`email=$${count}`);
            param.push(request.email ? request.email : "");
        }

        if (request.password || request.password !== "") {
            count++;
            column.push(`password=$${count}`);
            const hashedPassword = await hashString(request.password ? request.password : "");
            if (hashedPassword === "failed to hash") {
                throw new Error("Failed to hashing an password");
            }
            param.push(hashedPassword);
        }

        if (request.name || request.name !== "") {
            count++;
            column.push(`name=$${count}`);
            param.push(request.name ? request.name : "");
        }

        if (request.address || request.address !== "") {
            count++;
            column.push(`address=$${count}`);
            param.push(request.address ? request.address : "");
        }

        if (request.phone || request.phone !== "") {
            count++;
            column.push(`phone=$${count}`);
            param.push(request.phone ? request.phone : "");
        }

        if (request.profile_picture || request.profile_picture !== "") {
            count++;
            column.push(`profile_picture=$${count}`);
            param.push(request.profile_picture ? request.profile_picture : "");
        }

        if (request.updated_at || request.updated_at !== "") {
            count++;
            column.push(`updated_at=$${count}`);
            param.push(request.updated_at ? request.updated_at : "");
        }

        count++;
        column.push(`updated_by=$${count}`);
        param.push(request.updated_by ? request.updated_by : "");

        count++
        param.push(request.id);
        query += `${column.join(',')} WHERE id=$${count} RETURNING id`;

        const updatedItem = await db.one(query, param);

        return {
            id: updatedItem,
            message: "successfuly update user"
        }
    } catch (error) {
        console.log(error);
        return {
            message: "something went wrong"
        }
    }
}

export async function deleteUser(id:string): Promise<GeneralResponse> {
    try {
        await db.none('DELETE FROM users WHERE id = $1', id);
        return {
            id: id,
            message: "successfuly delete user"
        }
    } catch (error) {
        console.log(error);
        return {
            message: "something went wrong"
        }
    }
}