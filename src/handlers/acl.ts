import { Request, Response } from "express";
import { GeneralResponse } from "../types/response-general";
import { Query } from "../types/query-params";
import { ResponseGeneralList } from "../types/response-general-list";
import { RequestAddACLModel } from "../model/RequestAddACL.model";
import { RequestUpdateACLModel } from "../model/RequestUpdateACL.model";
import { addACLQuery, deleteAclQuery, getACLByIdQuery, listACLQuery, updateACLQuery } from "../queries/acl";
import { ACLItemModel } from "../model/ACLItem.model";

export async function listAclHandler(request:Request, response:Response<ResponseGeneralList>) {
    try {
        const { search, search_by, sort, sort_by, limit, page } = request.query as Query;
        const data = await listACLQuery({
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

export async function getAclByIdHandler(request:Request, response:Response<ACLItemModel>) {
    try {
        const { id } = request.params;

        const data = await getACLByIdQuery(id);
        
        return response.status(200).send(data);
    } catch (error) {
        console.log(error);
        return response.status(500).send({});
    }
}

export async function addAclHandler(request:Request<{}, {}, RequestAddACLModel>, response:Response<GeneralResponse>) {
    try {
        const data = await addACLQuery(request.body);
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

export async function updateAclHandler(request:Request<any, {}, RequestUpdateACLModel>, response:Response<GeneralResponse>) {
    try {
        const data = await updateACLQuery(request.body, request.params.id);
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

export async function deleteAclHandler(request:Request, response:Response<GeneralResponse>) {
    try {
        const data = await deleteAclQuery(request.params.id);
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