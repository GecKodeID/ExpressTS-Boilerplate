import { Request, Response } from "express";
import { RequestAddUserModel } from "../model/RequestAddUser.model";
import { GeneralResponse } from "../types/response-general";
import { UserItem } from "../model/UserItem.model";

export function register(request:Request<{}, {}, RequestAddUserModel>, response:Response<GeneralResponse>) {
    const { email, username, password, phone, name } = request.body
    return response.status(200).send({
        message: `successfuly register user ${username}, please login!`
    });
}

export function login(request:Request, response:Response) {
    return response.status(200).send({
        message: `successfuly logged in`
    });
}