import { Router } from "express";
import { login, register } from "../handlers/auth";

const router = Router();

router.get('/register', register);
router.get('/login', login);
export default router;