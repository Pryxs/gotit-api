import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import error from '../error'
import type { TokenType } from '../types';

const { UnauthorizedError } = error

export const authentificator = (allowedRole: string[]) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        const secretKey = process.env.SECRET_KEY
        if(!secretKey) throw new Error('Missing secret key')
        
        try {
            const token = req.headers?.authorization;

            if (!token) throw new UnauthorizedError();

            const { role, email, id } = jwt.verify(token, secretKey) as TokenType;

            if(!allowedRole.includes(role)) throw new UnauthorizedError();

            res.locals.user = {
                role,
                email,
                id,
            };  

            next();
        } catch (err) {
            next(err)
        }
    }
}