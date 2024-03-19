import { Request, Response } from "express";
import { RequestAddUserModel } from "../model/RequestAddUser.model";
import { GeneralResponse } from "../types/response-general";
import { UserItem } from "../model/UserItem.model";
import db from "../database/database";
import { addUserQuery } from "../queries/user";
import { RequestLoginModel } from "../model/RequestLogin.model";
import { ResponseLoginModel } from "../model/ResponseLogin.model";
import { compareHashString } from "../utils";

export async function register(request:Request<{}, {}, RequestAddUserModel>, response:Response<GeneralResponse>) {
    
    try {
        const { email, username, password, phone, name } = request.body
    
        // check the email or username is already available
        const data = await db.one('SELECT COUNT(*) AS total FROM users WHERE email=$1 OR username=$2', [email, username]);
        if (data.total > 0) {
            return response.status(400).send({
                message: "Email or username already taken"
            });
        }
    
        // search the role_id for users
        const role = await db.one(`SELECT role_id FROM role_name=$1`, ['users']);
    
        const savedData = await addUserQuery({
            email: email,
            username: username,
            password: password,
            phone: phone,
            name: name,
            role_id: role.role_id,
            created_by: username
        });
    
        return response.status(200).send({
            message: `successfuly register user ${username}, please login!`,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send({
            message: "something went wrong"
        })
    }
}

export async function login(request:Request<{}, {}, RequestLoginModel>, response:Response<ResponseLoginModel>) {
    const { username, password, email } = request.body;
    
    if (!username && !email) {
        return response.status(400).send({
            message: "missing username or email",
            token: ""
        })
    }

    const loginQuery = await db.one("SELECT username, password FROM users WHERE username=$1 OR email=$2", [username, email]);
    const result = await compareHashString(loginQuery.password, password);
    if (!result) {
        return response.status(400).send({
            message: "incorrect username, email or password",
            token: ""
        });
    }

    // create JWT Token
    

    return response.status(200).send({
        token: "",
        message: `successfuly logged in`
    });
}