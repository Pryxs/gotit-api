import { NextFunction, Request, Response } from "express";
import type { ValidationResult } from "../types";
import error from "../error"

const { BadRequestError } = error

type validator<T> = {
    validator: (resource: T) => ValidationResult<T>,
    type?: 'body' | 'header'
}

export const validator = <T>({ validator, type = 'body' }: validator<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = validator(req[type])

        if (error) throw new BadRequestError(error.details[0].message);

        next();
    }
}