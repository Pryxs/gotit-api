import Joi from 'joi'
import { IUser } from '../resources/users/users.model'
import type { ValidationResult, ObjectSchema } from '../types/index'

export const validateUser = (user: IUser): ValidationResult<IUser> => {
    const schema: ObjectSchema<IUser> = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
        profile: Joi.object({
            firstName: Joi.string().required(),
            name: Joi.string().required(),
            birthdate: Joi.string().required(),
        })
    })

    return schema.validate(user)
}