import { Router } from "express";
import { authenticate } from "./middleware/auth";
import { addRolesHandler, deleteRolesHandler, getRolesByIdHandler, listRolesHandler, updateRolesHandler } from "../handlers/roles";
import { checkACLUser } from "./middleware/acl";
import { validateInput } from "./middleware/validator";
import { paramIdSchemaValidation, querySchemaValidation, userRolesAddSchemaValidation, userRolesUpdateSchemaValidation } from "../types/validation-schema";

const router = Router();

router.use(authenticate);
router.get('/',
    (req, res, next) => checkACLUser(req, res, next, 'roles-READ'), 
    (req, res, next) => validateInput(querySchemaValidation, 'query', req, res, next),
    listRolesHandler); // get all data
router.post('/',
    (req, res, next) => checkACLUser(req, res, next, 'roles-CREATE'), 
    (req, res, next) => validateInput(userRolesAddSchemaValidation, 'body', req, res, next),
    addRolesHandler); // save data
router.get('/:id', 
    (req, res, next) => checkACLUser(req, res, next, 'roles-READ'), 
    (req, res, next) => validateInput(paramIdSchemaValidation, 'param', req, res, next),
    getRolesByIdHandler); // get data by id
router.delete('/:id', 
    (req, res, next) => checkACLUser(req, res, next, 'roles-DELETE'), 
    (req, res, next) => validateInput(paramIdSchemaValidation, 'param', req, res, next),
    deleteRolesHandler); // delete data by id
router.put('/:id', 
    (req, res, next) => checkACLUser(req, res, next, 'roles-UPDATE'), 
    (req, res, next) => validateInput(userRolesUpdateSchemaValidation, 'id-body', req, res, next),
    updateRolesHandler); // update data by id

export default router;