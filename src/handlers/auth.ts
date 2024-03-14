import { Request, Response } from "express";
import { RequestAddUserModel } from "../model/RequestAddUser.model";
import { GeneralResponse } from "../types/response-general";
import db from "../database/database";
import { addUserQuery } from "../queries/user";
import { RequestLoginModel } from "../model/RequestLogin.model";
import { ResponseLoginModel } from "../model/ResponseLogin.model";
import { compareHashString } from "../misc/utils";
import { createToken } from "../misc/jwt";
import env from 'dotenv';

env.config();

const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";

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
        const role = await db.one(`SELECT role_id FROM userroles WHERE role_name=$1`, ['user']);
        const savedData = await addUserQuery({
            email: email,
            username: username,
            password: password,
            phone: phone,
            name: name,
            role_id: role.role_id
        });

        if (savedData.message === "something went wrong") {
            throw new Error(savedData.message);
        }
    
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
    try {
        const { username, password, email } = request.body;
        
        if (!username && !email) {
            return response.status(400).send({
                message: "missing username or email",
                token: ""
            })
        }
    
        const loginQuery = await db.one("SELECT user_id, email, username, password FROM users WHERE username=$1 OR email=$2", [username, email]);
        const result = await compareHashString(loginQuery.password, password);
        if (!result) {
            return response.status(400).send({
                message: "incorrect username, email or password",
                token: ""
            });
        }
    
        // create JWT Token
        const token = createToken({
            id: loginQuery.user_id,
            email: loginQuery.email,
            username: loginQuery.username
        }, JWT_SECRET, '1d');
        if (token === "Failed to sign jwt") {
            return response.status(200).send({
                message: token,
                token: ""
            });
        }

        return response.status(200).send({
            token: token,
            message: `successfuly logged in`
        });
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            if (error.message.includes("No data")) {
                return response.status(400).send({
                    token: "",
                    message: "incorrect username, email or password"
                });
            }
        }
        return response.status(500).send({
            token: "",
            message: "something went wrong"
        });
    }
}