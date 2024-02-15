import { Router } from "express";
import { get, getAll, create, update, remove } from './lessons.controller'
import { validator } from "../../midllewares/validator";
import { mongoIdvalidator } from "../../midllewares/mongoIdValidator";
import { validateLesson } from "../../dto/lessons.dto"
import { ILesson } from "./lessons.model";
import { authentificator } from "../../midllewares/authentificator";

const router = Router();

// TODO : restrict private for users
router
    .route('')
    .get(getAll)
    .post([
        authentificator(['editor']),
        validator<ILesson>({validator: validateLesson})
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

export const LessonRouter = router;

