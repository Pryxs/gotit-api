import { Router } from "express";
import { get, getAll, create, update, remove } from './lessons.controller'
import { validator } from "../../midllewares/validator";
import { mongoIdvalidator } from "../../midllewares/mongoIdValidator";
import { validateLesson } from "../../dto/lessons.dto"
import { ILesson } from "./lessons.model";

const router = Router();

router.route('').get(getAll).post(validator<ILesson>({validator: validateLesson}),create);
router
    .route('/:id')
    .get([mongoIdvalidator()], get)
    .patch([mongoIdvalidator()], update)
    .delete([mongoIdvalidator()], remove);

export const LessonRouter = router;

