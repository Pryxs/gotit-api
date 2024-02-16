import Joi from 'joi'
import { ICategory } from '../resources/categories/categories.model'
import type { ValidationResult, ObjectSchema } from '../types/index'

export const validateCategory = (category: ICategory): ValidationResult<ICategory> => {
    const schema: ObjectSchema<ICategory> = Joi.object({
        name: Joi.string().required(),   
    })

    return schema.validate(category)
}