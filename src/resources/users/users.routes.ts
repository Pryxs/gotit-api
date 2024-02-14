import { Router } from "express";
import { get, getAll, create, update, remove } from './users.controller'
import { validator } from "../../midllewares/validator";
import { mongoIdvalidator } from "../../midllewares/mongoIdValidator";
import { validateUser } from "../../dto/users.dto"
import { IUser } from "./users.model";
import { authentificator } from "../../midllewares/authentificator";

const router = Router();

router.use(authentificator(['admin']))

router.route('').get(getAll).post(validator<IUser>({validator: validateUser}),create);
router
    .route('/:id')
    .get([mongoIdvalidator()], get)
    .patch([mongoIdvalidator()], update)
    .delete([mongoIdvalidator()], remove);

export const UserRouter = router;

