import Joi from 'joi'
import { ILesson } from '../resources/lessons/lessons.model'
import type { ValidationResult, ObjectSchema } from '../types/index'

export const validateLesson = (lesson: ILesson): ValidationResult<ILesson> => {
    const schema: ObjectSchema<ILesson> = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        status: Joi.string().required(), 
        categories: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
    })

    return schema.validate(lesson)
}