import { NextFunction, Request, Response } from "express";
import error from "../error"
import { ObjectId } from 'mongodb';

const { BadRequestError } = error

export const mongoIdValidatorMidlleware = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        if (!id || !ObjectId.isValid(id)) throw new BadRequestError()

        next();
    }
}