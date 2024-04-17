import { Request, Response } from "express";
import { GeneralResponse } from "../types/response-general";
import { Query } from "../types/query-params";
import { ResponseGeneralList } from "../types/response-general-list";
import { addACLQuery, deleteAclQuery, getACLByIdQuery, listACLQuery, updateACLQuery } from "../queries/acl";
import { ACLItemModel, RequestAddACLModel, RequestUpdateACLModel } from "../model/ACL.model";
import { addTEMPLATEQuery, deleteTEMPLATEQuery, getTEMPLATEByIdQuery, listTEMPLATEQuery, updateTEMPLATEQuery } from "../queries/TEMPLATE";
import { RequestAddTEMPLATEModel, RequestUpdateTEMPLATEModel, TEMPLATEItemModel } from "../model/TEMPLATE.model";

export async function listTEMPLATEHandler(request:Request, response:Response<ResponseGeneralList>) {
    try {
        const { search, search_by, sort, sort_by, limit, page } = request.query as Query;
        const data = await listTEMPLATEQuery({
            search: search,
            sort_by: sort_by,
            sort: sort,
            limit: limit,
            page: page,
            search_by: search_by
        });

        return response.status(200).send(data);
    } catch (error) {
        console.log(error);
        return response.status(500).send({
            message: "something went wrong"
        });
    }
}

export async function getTEMPLATEByIdHandler(request:Request, response:Response<TEMPLATEItemModel>) {
    try {
        const { id } = request.params;

        const data = await getTEMPLATEByIdQuery(id);
        
        return response.status(200).send(data);
    } catch (error) {
        console.log(error);
        return response.status(500).send({});
    }
}

export async function addTEMPLATEHandler(request:Request<{}, {}, RequestAddTEMPLATEModel>, response:Response<GeneralResponse>) {
    try {
        const data = await addTEMPLATEQuery(request.body);
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

export async function updateTEMPLATEHandler(request:Request<any, {}, RequestUpdateTEMPLATEModel>, response:Response<GeneralResponse>) {
    try {
        const data = await updateTEMPLATEQuery(request.body, request.params.id);
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

export async function deleteTEMPLATEHandler(request:Request, response:Response<GeneralResponse>) {
    try {
        const data = await deleteTEMPLATEQuery(request.params.id);
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