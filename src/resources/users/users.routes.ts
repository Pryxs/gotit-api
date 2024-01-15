import { Router } from "express";
import { get, getAll, create, update, remove } from './users.controller'
import { validatorMidlleware } from "../../midllewares/validator";
import { validateUser } from "../../dto/users.dto"

const router = Router();

router.route('').get(getAll).post(create);
router
    .route('/:id')
    .get(get)
    .put([validatorMidlleware({ validator: validateUser })], update)
    .delete(remove);

export const UserRouter = router;

