import { Router } from "express";
import { authenticate } from "./middleware/auth";
import { addAclHandler, deleteAclHandler, getAclByIdHandler, listAclHandler, updateAclHandler } from "../handlers/acl";
import { checkACLUser } from "./middleware/acl";
import { validateInput } from "./middleware/validator";
import { ACLAddSchemaValidation, ACLUpdateSchemaValidation, paramIdSchemaValidation, querySchemaValidation } from "../types/validation-schema";

const router = Router();

router.use(authenticate);
router.get('/', 
    (req, res, next) => checkACLUser(req, res, next, 'acl-READ'), 
    (req, res, next) => validateInput(querySchemaValidation, 'query', req, res, next), 
    listAclHandler); // get all data
router.post('/', 
    (req, res, next) => checkACLUser(req, res, next, 'acl-CREATE'), 
    (req, res, next) => validateInput(ACLAddSchemaValidation, 'body', req, res, next),
    addAclHandler); // save data
router.get('/:id', 
    (req, res, next) => checkACLUser(req, res, next, 'acl-READ'), 
    (req, res, next) => validateInput(paramIdSchemaValidation, 'param', req, res, next),
    getAclByIdHandler); // get data by id
router.delete('/:id',
    (req, res, next) => checkACLUser(req, res, next, 'acl-DELETE'), 
    (req, res, next) => validateInput(paramIdSchemaValidation, 'param', req, res, next),
    deleteAclHandler); // delete data by id
router.put('/:id', 
    (req, res, next) => checkACLUser(req, res, next, 'acl-UPDATE'), 
    (req, res, next) => validateInput(ACLUpdateSchemaValidation, 'id-body', req, res, next),
    updateAclHandler); // update data by id

export default router;