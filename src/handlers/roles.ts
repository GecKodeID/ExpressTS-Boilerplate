import { Request, Response } from "express";
import { GeneralResponse } from "../types/response-general";
import { RequestAddRoleModel } from "../model/RequestAddRole.model";
import { RequestUpdateRoleModel } from "../model/RequestUpdate.model";
import { UserRolesItem } from "../model/UserRolesItem.model";
import { ResponseGeneralList } from "../types/response-general-list";
import { addRoleQuery, deleteRoleQuery, getRolesByIdQuery, listRolesQuery, updateRoleQuery } from "../queries/roles";
import { Query } from "../types/query-params";

export async function listRolesHandler(request:Request, response:Response<ResponseGeneralList>) {
    try {
        const { search, sort, sort_by, limit, page } = request.query as Query;
        const data = await listRolesQuery({
            search: search,
            sort_by: sort_by,
            sort: sort,
            limit: limit,
            page: page
        });

        return response.status(200).send(data);
    } catch (error) {
        console.log(error);
        return response.status(500).send({
            message: "something went wrong"
        });
    }
}

export async function getRolesByIdHandler(request:Request, response:Response<UserRolesItem>) {
    try {
        const { id } = request.params;

        const data = await getRolesByIdQuery(id);
        
        return response.status(200).send(data);
    } catch (error) {
        console.log(error);
        return response.status(500).send({});
    }
}

export async function addRolesHandler(request:Request<{}, {}, RequestAddRoleModel>, response:Response<GeneralResponse>) {
    try {
        const data = await addRoleQuery(request.body);
        return response.status(200).send(data);
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return response.status(500).send({
                message: error.message
            });
        }
        return response.status(500).send({
            message: "Somenthing went wrong"
        });
    }
}

export async function updateRolesHandler(request:Request<any, {}, RequestUpdateRoleModel>, response:Response<GeneralResponse>) {
    try {
        const data = await updateRoleQuery(request.body, request.params.id);
        return response.status(200).send(data);
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return response.status(500).send({
                message: error.message
            });
        }
        return response.status(500).send({
            message: "Somenthing went wrong"
        });
    }
}

export async function deleteRolesHandler(request:Request, response:Response<GeneralResponse>) {
    try {
        const data = await deleteRoleQuery(request.params.id);
        return response.status(200).send(data);
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return response.status(500).send({
                message: error.message
            });
        }
        return response.status(500).send({
            message: "Somenthing went wrong"
        });
    }
}