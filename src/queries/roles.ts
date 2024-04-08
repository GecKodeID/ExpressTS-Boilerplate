import db from "../database/database";
import { Query } from "../types/query-params";
import { GeneralResponse } from "../types/response-general";
import { ResponseGeneralList } from "../types/response-general-list";
import { RequestAddRoleModel } from "../model/RequestAddRole.model";
import { RequestUpdateRoleModel } from "../model/RequestUpdate.model";
import { UserRolesItem } from "../model/UserRolesItem.model";

enum RolesColumn {
    ID = "role_id",
    ROLE_NAME = "role_name",
    CREATED_BY = "created_by",
    UPDATED_BY = "updated_by"
}

function isRolesColumn(value: string): value is RolesColumn {
    const column: string[] = Object.values(RolesColumn);
    return column.includes(value);
}

export async function listRolesQuery(request:Query): Promise<ResponseGeneralList> {
    try {
        let query = `SELECT 
        role_id,
        role_name,  
        created_at, 
        created_by, 
        updated_at, 
        updated_by FROM userroles `;

        let count = 0;
        let params = [];
        let cmdQuery = "";

        const searchBy = request.search_by ? request.search_by : "role_name";
        if (request.search) {
            count++;
            cmdQuery += `WHERE ${isRolesColumn(searchBy) ? searchBy : "role_name"} ILIKE $${count} `
            params.push(`%${request.search}%`)
        }

        const countData = await db.one(`SELECT COUNT(*) AS total FROM userroles ${cmdQuery}`, params);
        
        const sortBy = request.sort_by ? request.sort_by : "role_name";
        request.sort = request.sort?.toLowerCase() === "asc" ? "ASC" : "DESC";
        cmdQuery += `ORDER BY ${isRolesColumn(sortBy) ? sortBy : "role_name"} ${request.sort}`;

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
            total: countData.total,
            order: request.sort,
            items: items
        }
      } catch (error: any) {
        console.log(error);
        throw new Error(error);
      }
}

export async function getRolesByIdQuery(id:string): Promise<UserRolesItem> {
    try {
        const item = await db.one(`SELECT 
        role_id,
        role_name, 
        created_at, 
        created_by, 
        updated_at, 
        updated_by FROM userroles WHERE role_id=$1`, id);
        return {
            id: item.role_id,
            role_name: item.role_name,
            created_at: item.created_at,
            created_by: item.created_by,
            updated_at: item.updated_at,
            updated_by: item.updated_by
        };
      } catch (error: any) {
        console.log(error);
        throw new Error(error);
      }
}

export async function addRoleQuery(request:RequestAddRoleModel): Promise<GeneralResponse> {
    try {
        let query = "INSERT INTO userroles ";
        let column = ['role_name', 'created_by'];
        let valueParam = ['$1', '$2'];  
        let param: string[] = [request.role_name, request.created_by];
        let count = valueParam.length;

        if (request.created_at) {
            count++;
            column.push('created_at');
            valueParam.push(`$${count}`);
            param.push(request.created_at ? request.created_at : "");
        }

        query += `(${column.join(',')}) VALUES (${valueParam.join(',')}) RETURNING role_id`

        const data = await db.one(query, param);
        return {
            id: data.role_id,
            message: "successfuly create role"
        };
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
        
    }
}

export async function updateRoleQuery(request:RequestUpdateRoleModel, id: string): Promise<GeneralResponse> {
    try {
        let query = "UPDATE userroles SET ";
        let column = [];
        let param: string[] = [];
        let count = column.length;

        if (request.role_name) {
            count++;
            column.push(`role_name=$${count}`);
            param.push(request.role_name ? request.role_name : "");
        }

        count++;
        column.push(`updated_by=$${count}`);
        param.push(request.updated_by ? request.updated_by : "");

        count++
        param.push(id);
        query += `${column.join(',')} WHERE role_id=$${count} RETURNING role_id`;

        const updatedItem = await db.one(query, param);

        return {
            id: updatedItem.role_id,
            message: "successfuly update role"
        }
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export async function deleteRoleQuery(id:string): Promise<GeneralResponse> {
    try {
        await db.none('DELETE FROM userroles WHERE role_id = $1', id);
        return {
            id: id,
            message: "successfuly delete role"
        }
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}