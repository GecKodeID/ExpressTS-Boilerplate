import { Request, Response } from "express";
import { RequestAddUserModel } from "../model/RequestAddUser.model";
import { RequestUpdateUserModel } from "../model/RequestUpdateUser.model";
import { GeneralResponse } from "../types/response-general";
import { UserItem } from "../model/UserItem.model";
import { Query } from "../types/query-params";
import { ResponseGeneralList } from "../types/response-general-list";
import { addUserQuery, deleteUserQuery, getUserByIdQuery, listUsersQuery, updateUserQuery } from "../queries/user";

export async function listUsersHandler(request:Request, response:Response<ResponseGeneralList>) {
    try {
        const { search, search_by, sort, sort_by, limit, page } = request.query as Query;
        const data = await listUsersQuery({
            search: search,
            search_by: search_by,
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

export async function getUserByIdHandler(request:Request, response:Response<UserItem>) {
    try {
        const { id } = request.params;

        const data = await getUserByIdQuery(id);
        
        return response.status(200).send(data);
    } catch (error: any) {
        console.log(error);
        return response.status(500).send({
            message: error.message
        });
    }
}

export async function addUserHandler(request:Request<{}, {}, RequestAddUserModel>, response:Response<GeneralResponse>) {
    try {
        const data = await addUserQuery(request.body);
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

export async function updateUserHandler(request:Request<any, {}, RequestUpdateUserModel>, response:Response<GeneralResponse>) {
    try {
        const data = await updateUserQuery(request.body, request.params.id);
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

export async function deleteUserHandler(request:Request, response:Response<GeneralResponse>) {
    try {
        const data = await deleteUserQuery(request.params.id);
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