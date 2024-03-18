import db from "../database/database";
import { RequestAddUserModel } from "../model/RequestAddUser.model";
import { RequestUpdateUserModel } from "../model/RequestUpdateUser.model";
import { Query } from "../types/query-params";
import { GeneralResponse } from "../types/response-general";
import { ResponseGeneralList } from "../types/response-general-list";

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
        updated_by FROM users`;

        const items = await db.any(query);
        return {
            limit: 0,
            page: 0,
            order: "",
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
        let query = "INSERT INTO users ";
        let column = ['username', 'email', 'password', 'name', 'phone'];
        let valueParam = ['$1', '$2', '$3', '$4', '$5'];
        let param: string[] = [request.username, request.email, request.password, request.name, request.phone];
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
            param.push(request.password ? request.password : "");
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