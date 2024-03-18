import { Router } from "express";
import { addUser, deleteUser, getUserById, listUsers, updateUser } from "../handlers/users";
import { JWTauth } from "./middleware/auth";

const router = Router();

router.use(JWTauth);
router.get('/', listUsers); // get all data
router.post('/', addUser); // save data
router.get('/:id', getUserById); // get data by id
router.delete('/:id', deleteUser); // delete data by id
router.put('/:id', updateUser); // update data by id

export default router;