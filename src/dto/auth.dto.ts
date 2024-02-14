import Joi from 'joi'
import { IAuth } from '../resources/users/users.model'
import type { ValidationResult, ObjectSchema } from '../types/index'

export const validateAuth = (auth: IAuth): ValidationResult<IAuth> => {
    const schema: ObjectSchema<IAuth> = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(6).required(),    
    })

    return schema.validate(auth)
}