import { Router } from "express";
import { get, getAll, create, update, remove } from './lessons.controller'
import { validatorMidlleware } from "../../midllewares/validator";
import { mongoIdValidatorMidlleware } from "../../midllewares/mongoIdValidator";
import { validateLesson } from "../../dto/lessons.dto"
import { ILesson } from "./lessons.model";

const router = Router();

router.route('').get(getAll).post(validatorMidlleware<ILesson>({validator: validateLesson}),create);
router
    .route('/:id')
    .get([mongoIdValidatorMidlleware()], get)
    .patch([mongoIdValidatorMidlleware()], update)
    .delete([mongoIdValidatorMidlleware()], remove);

export const LessonRouter = router;

