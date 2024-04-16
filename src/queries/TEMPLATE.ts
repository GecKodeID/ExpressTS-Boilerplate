import db from "../database/database";
import { Query } from "../types/query-params";
import { GeneralResponse } from "../types/response-general";
import { ResponseGeneralList } from "../types/response-general-list";
import { RequestAddTEMPLATEModel, RequestUpdateTEMPLATEModel, TEMPLATEItemModel } from "../model/TEMPLATE.model";

enum TEMPLATEColumn {
    ID = "id",
    NAME = "name",
    CREATED_BY = "created_by",
    UPDATED_BY = "updated_by"
}

function isTEMPLATEColumn(value: string): value is TEMPLATEColumn {
    const columns: string[] = Object.values(TEMPLATEColumn);
    return columns.includes(value);
}

export async function listTEMPLATEQuery(request:Query): Promise<ResponseGeneralList> {
    try {
        let query = `SELECT 
        id, 
        name, 
        created_at, 
        created_by, 
        updated_at, 
        updated_by FROM template `;

        let count = 0;
        let params = [];
        let cmdQuery = "";

        const searchBy = request.search_by ? request.search_by : "name";
        if (request.search) {
            count++;
            cmdQuery += `WHERE ${isTEMPLATEColumn(searchBy) ? searchBy : "name"} ILIKE $${count} `
            params.push(`%${request.search}%`)
        }

        const countData = await db.one(`SELECT COUNT(*) AS total FROM template ${cmdQuery}`, params);

        const sortBy = request.sort_by ? request.sort_by : "name";
        request.sort = request.sort?.toLowerCase() === "asc" ? "ASC" : "DESC";
        cmdQuery += `ORDER BY ${isTEMPLATEColumn(sortBy) ? sortBy : "name"} ${request.sort}`;

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

export async function getTEMPLATEByIdQuery(id:string): Promise<TEMPLATEItemModel> {
    try {
        const item = await db.one(`SELECT 
        id, 
        name, 
        created_at, 
        created_by, 
        updated_at, 
        updated_by FROM template WHERE id=$1`, id);
        return {
            id: item.id,
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

export async function addTEMPLATEQuery(request:RequestAddTEMPLATEModel): Promise<GeneralResponse> {
    try {

        let query = "INSERT INTO template ";
        let column = ['name', 'created_by'];
        let valueParam = ['$1', '$2'];
        let param: string[] = [request.name, request.created_by];

        query += `(${column.join(',')}) VALUES (${valueParam.join(',')}) RETURNING id`

        const data = await db.one(query, param);
        return {
            id: data.id,
            message: "successfuly create TEMPLATE"
        };
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export async function updateTEMPLATEQuery(request:RequestUpdateTEMPLATEModel, id:string): Promise<GeneralResponse> {
    try {
        let query = "UPDATE template SET ";
        let column = [];
        let param: string[] = [];
        let count = column.length;

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
        query += `${column.join(',')} WHERE id=$${count} RETURNING id`;

        const updatedItem = await db.one(query, param);

        return {
            id: updatedItem.id,
            message: "successfuly update TEMPLATE"
        }
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}

export async function deleteTEMPLATEQuery(id:string): Promise<GeneralResponse> {
    try {
        await db.none('DELETE FROM template WHERE id = $1', id);
        return {
            id: id,
            message: "successfuly delete TEMPLATE"
        }
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }
}