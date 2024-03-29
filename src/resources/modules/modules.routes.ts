import { Router } from "express";
import { get, getAll, create, update, remove } from './modules.controller'
import { validator } from "../../midllewares/validator";
import { mongoIdvalidator } from "../../midllewares/mongoIdValidator";
import { validateModule } from "../../dto/modules.dto"
import { IModule } from "./modules.model";
import { authentificator } from "../../midllewares/authentificator";

const router = Router();

router
    .route('')
    .get(getAll)
    .post([
        authentificator(['editor']),
        validator<IModule>({validator: validateModule})
    ] ,create);
router
    .route('/:id')
    .get([mongoIdvalidator()], get)
    .patch([
        authentificator(['editor', 'admin']),
        mongoIdvalidator()
    ], update)
    .delete([
        authentificator(['editor', 'admin']), 
        mongoIdvalidator()
    ], remove);

export const ModuleRouter = router;

