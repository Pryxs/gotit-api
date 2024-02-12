import { NextFunction, Request, Response } from "express";
import type { ValidationResult } from "../types";

type ValidatorMidlleware<T> = {
    validator: (resource: T) => ValidationResult<T>,
    type?: 'body' | 'header'
}

export const validatorMidlleware = <T>({ validator, type = 'body' }: ValidatorMidlleware<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = validator(req[type])
        if (error) {
            return res.status(400).json(error.details[0].message)
        }
        next();
    }
}