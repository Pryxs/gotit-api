import Joi from 'joi'
import { IModule } from '../resources/modules/modules.model'
import type { ValidationResult, ObjectSchema } from '../types/index'

export const validateModule = (module: IModule): ValidationResult<IModule> => {
    const schema: ObjectSchema<IModule> = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        level: Joi.number().required(),
        lessons: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)).required(),
        categories: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
        status: Joi.string().required(),    
    })

    return schema.validate(module)
}