import { Router } from "express";
import { login, register } from "../handlers/auth";
import { validateInput } from "./middleware/validator";
import { loginSchemaValidation, registerSchemaValidation } from "../types/validation-schema";

const router = Router();

router.post('/register', (req, res, next) => validateInput(registerSchemaValidation, 'body', req, res, next), register);
router.post('/login', (req, res, next) => validateInput(loginSchemaValidation, 'body', req, res, next), login);
export default router;