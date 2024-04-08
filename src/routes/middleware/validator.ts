import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

export async function validateInput(schema: yup.ObjectSchema<any>, type: string, request: Request, response: Response, next: NextFunction) {
    try {
        let req = request.body;
        switch (type.toLowerCase()) {
            case 'query':
                req = request.query;    
            break;
            case 'param':
                req = request.params;
            case 'id-body':
                req = {
                    id: request.params.id,
                    ...request.body
                }
            default:
                req = request.body;
            break;
        }
        await schema.validate(req, { abortEarly: false });
        next();
    } catch (error: any) {
        console.log(error);
        return response.status(400).send({ message: error.errors ? error.errors[0] : error.message });
    }    
}