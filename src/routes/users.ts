import { Router } from "express";
import { addUserHandler, deleteUserHandler, getUserByIdHandler, listUsersHandler, updateUserHandler } from "../handlers/users";
import { authenticate } from "./middleware/auth";
import { checkACLUser } from "./middleware/acl";
import { validateInput } from "./middleware/validator";
import { paramIdSchemaValidation, querySchemaValidation, userAddSchemaValidation, userUpdateSchemaValidation } from "../types/validation-schema";

const router = Router();

router.use(authenticate);
router.get('/', 
    (req, res, next) => checkACLUser(req, res, next, 'users-READ'), 
    (req, res, next) => validateInput(querySchemaValidation, 'query', req, res, next), 
    listUsersHandler); // get all data
router.post('/', 
    (req, res, next) => checkACLUser(req, res, next, 'users-CREATE'), 
    (req, res, next) => validateInput(userAddSchemaValidation, 'body', req, res, next),
    addUserHandler); // save data
router.get('/:id', 
    (req, res, next) => checkACLUser(req, res, next, 'users-READ'),
    (req, res, next) => validateInput(paramIdSchemaValidation, 'param', req, res, next), 
    getUserByIdHandler); // get data by id
router.delete('/:id', 
    (req, res, next) => checkACLUser(req, res, next, 'users-DELETE'), 
    (req, res, next) => validateInput(paramIdSchemaValidation, 'param', req, res, next), 
    deleteUserHandler); // delete data by id
router.put('/:id', 
    (req, res, next) => checkACLUser(req, res, next, 'users-UPDATE'), 
    (req, res, next) => validateInput(userUpdateSchemaValidation, 'id-param', req, res, next), 
    updateUserHandler); // update data by id

export default router;