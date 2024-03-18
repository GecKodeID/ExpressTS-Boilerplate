import { Router } from "express";
import { JWTauth } from "./middleware/auth";

const router = Router();

router.use(JWTauth);
router.get('/'); // get all data
router.post('/'); // save data
router.get('/:id'); // get data by id
router.delete('/:id'); // delete data by id
router.put('/:id'); // update data by id

export default router;