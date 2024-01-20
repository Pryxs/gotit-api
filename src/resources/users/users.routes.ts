import { Router } from "express";
import { get, getAll, create, update, remove } from './users.controller'
import { validatorMidlleware } from "../../midllewares/validator";
import { mongoIdValidatorMidlleware } from "../../midllewares/mongoIdValidator";
import { validateUser } from "../../dto/users.dto"

const router = Router();

router.route('').get(getAll).post(create);
router
    .route('/:id')
    .get([mongoIdValidatorMidlleware()], get)
    .patch([mongoIdValidatorMidlleware()], update)
    .delete([mongoIdValidatorMidlleware()], remove);

export const UserRouter = router;

