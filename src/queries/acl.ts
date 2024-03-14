import db from "../database/database";
import { Query } from "../types/query-params";
import { GeneralResponse } from "../types/response-general";
import { ResponseGeneralList } from "../types/response-general-list";
import { RequestAddACLModel } from "../model/RequestAddACL.model";
import { RequestUpdateACLModel } from "../model/RequestUpdateACL.model";
import { ACLItemModel } from "../model/ACLItem.model";

enum ACLColumn {
    ID = "acl_id",
    ROLE_ID = "role_id",
    NAME = "name",
    CREATED_BY = "created_by",
    UPDATED_BY = "updated_by"
}

function isACLColumn(value: string): value is ACLColumn {
    const columns: string[] = Object.values(ACLColumn);
    return columns.includes(value);
}

export async function listACLQuery(request:Query): Promise<ResponseGeneralList> {
    try {
        let query = `SELECT 
        acl_id, 
        role_id, 
        name, 
        created_at, 
        created_by, 
        updated_at, 
        updated_by FROM acl `;

        let count = 0;
        let params = [];
        let cmdQuery = "";
        if (request.search) {
            count++;
            cmdQuery += `WHERE name ILIKE '%$${count}%'`
            params.push(request.search)
        }

        const countData = await db.one(`SELECT COUNT(*) AS total FROM ACL ${cmdQuery}`);

        const sortBy = request.sort_by ? request.sort_by : "username";
        request.sort = request.sort?.toLowerCase() === "asc" ? "ASC" : "DESC";
        cmdQuery += `ORDER BY ${isACLColumn(sortBy) ? sortBy : "username"} ${request.sort}`;

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
        throw new Error(error);
        
      }
}

export async function getACLByIdQuery(id:string): Promise<ACLItemModel> {
    try {
        const item = await db.one(`SELECT 
        acl_id, 
        role_id, 
        name, 
        created_at, 
        created_by, 
        updated_at, 
        updated_by FROM acl WHERE acl_id=$1`, id);
        return {
            id: item.acl_id,
            role_id: item.role_id,
            name: item.name,
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

export async function addACLQuery(request:RequestAddACLModel): Promise<GeneralResponse> {
    try {

        let query = "INSERT INTO ACL ";
        let column = ['role_id', 'name', 'created_by'];
        let valueParam = ['$1', '$2', '$3'];
        let param: string[] = [request.role_id, request.name, request.created_by];
        let count = valueParam.length;

        query += `(${column.join(',')}) VALUES (${valueParam.join(',')}) RETURNING acl_id`

        const data = await db.one(query, param);
        return {
            id: data.acl_id,
            message: "successfuly create ACL"
        };
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export async function updateACLQuery(request:RequestUpdateACLModel, id:string): Promise<GeneralResponse> {
    try {
        let query = "UPDATE acl SET ";
        let column = [];
        let param: string[] = [];
        let count = column.length;

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
        query += `${column.join(',')} WHERE acl_id=$${count} RETURNING acl_id`;

        const updatedItem = await db.one(query, param);

        return {
            id: updatedItem,
            message: "successfuly update ACL"
        }
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export async function deleteAclQuery(id:string): Promise<GeneralResponse> {
    try {
        await db.none('DELETE FROM acl WHERE acl_id = $1', id);
        return {
            id: id,
            message: "successfuly delete acl"
        }
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}