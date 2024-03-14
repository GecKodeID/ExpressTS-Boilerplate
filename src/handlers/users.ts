import { Request, Response } from "express";
import { RequestAddUserModel } from "../model/RequestAddUser.model";
import { RequestUpdateUserModel } from "../model/RequestUpdateUser.model";
import { QueryId } from "../types/query-params";
import { GeneralResponse } from "../types/response-general";
import { UserItem } from "../model/UserItem.model";
import { ResponseListUser } from "../model/ResponseListUser.model";

export function listUsers(request:Request, response:Response<ResponseListUser>) {
    return response.status(200).send({});
}

export function getUserById(request:Request<QueryId, {}, {}>, response:Response<UserItem>) {
    return response.status(200).send({
        username: "",
        email: "",
        name: ""
    });
}

export function addUser(request:Request<{}, {}, RequestAddUserModel>, response:Response<GeneralResponse>) {
    return response.status(200).send({
        message: "success"
    });
}

export function updateUser(request:Request<{}, {}, RequestUpdateUserModel>, response:Response<GeneralResponse>) {
    return response.status(200).send({
        message: "success"
    });
}

export function deleteUser(request:Request, response:Response<GeneralResponse>) {
    return response.status(200).send({
        message: "success"
    });
}