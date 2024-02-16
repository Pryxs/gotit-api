import { Router } from "express";
import { get, getAll, create, update, remove } from './categories.controller'
import { validator } from "../../midllewares/validator";
import { mongoIdvalidator } from "../../midllewares/mongoIdValidator";
import { validateCategory } from "../../dto/categories.dto"
import { ICategory } from "./categories.model";
import { authentificator } from "../../midllewares/authentificator";

const router = Router();

router
    .route('')
    .get(getAll)
    .post([
        authentificator(['admin']),
        validator<ICategory>({validator: validateCategory})
    ] ,create);
router
    .route('/:id')
    .get([mongoIdvalidator()], get)
    .patch([
        authentificator(['admin']),
        mongoIdvalidator()
    ], update)
    .delete([
        authentificator(['admin']), 
        mongoIdvalidator()
    ], remove);

export const CategoryRouter = router;

