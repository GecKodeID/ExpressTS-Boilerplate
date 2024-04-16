import { Router } from "express";
import { authenticate } from "./middleware/auth";
import { checkACLUser } from "./middleware/acl";
import { validateInput } from "./middleware/validator";
import { TEMPLATEAddSchemaValidation, TEMPLATEUpdateSchemaValidation, paramIdSchemaValidation, querySchemaValidation } from "../types/validation-schema";
import { addTEMPLATEHandler, deleteTEMPLATEHandler, getTEMPLATEByIdHandler, listTEMPLATEHandler, updateTEMPLATEHandler } from "../handlers/TEMPLATE";

const router = Router();

router.use(authenticate);
router.get('/', 
    (req, res, next) => checkACLUser(req, res, next, 'TEMPLATE-READ'), 
    (req, res, next) => validateInput(querySchemaValidation, 'query', req, res, next), 
    listTEMPLATEHandler); // get all data
router.post('/', 
    (req, res, next) => checkACLUser(req, res, next, 'TEMPLATE-CREATE'), 
    (req, res, next) => validateInput(TEMPLATEAddSchemaValidation, 'body', req, res, next),
    addTEMPLATEHandler); // save data
router.get('/:id', 
    (req, res, next) => checkACLUser(req, res, next, 'TEMPLATE-READ'), 
    (req, res, next) => validateInput(paramIdSchemaValidation, 'param', req, res, next),
    getTEMPLATEByIdHandler); // get data by id
router.delete('/:id',
    (req, res, next) => checkACLUser(req, res, next, 'TEMPLATE-DELETE'), 
    (req, res, next) => validateInput(paramIdSchemaValidation, 'param', req, res, next),
    deleteTEMPLATEHandler); // delete data by id
router.put('/:id', 
    (req, res, next) => checkACLUser(req, res, next, 'TEMPLATE-UPDATE'), 
    (req, res, next) => validateInput(TEMPLATEUpdateSchemaValidation, 'id-body', req, res, next),
    updateTEMPLATEHandler); // update data by id

export default router;