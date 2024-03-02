import { NextFunction, Request, Response } from 'express';
import { IResponse } from '../../types';
import BcryptHelper from '../../utils/bcrypt.helper';
import jwt from 'jsonwebtoken';
import UserService from '../users/users.service';
import error from "../../error"
import { ObjectId } from 'mongoose';
import { IUser } from '../users/users.model';

const { UnauthorizedError } = error
const { decrypt } = BcryptHelper
const { getUser } = UserService

export const login = async (req: Request<{ id: string }>, res: Response<IResponse<{ token: string }>>, next: NextFunction) => {
    const secretKey = process.env.SECRET_KEY
    if (!secretKey) throw new Error('missing secret key')

    try {
        const { email, password } = req.body

        const user = await getUser({ email }) as IUser & { _id: ObjectId }

        const isCheck = decrypt(password, user.password)
        if (!isCheck) throw new UnauthorizedError();

        const token = jwt.sign({ email, role: user.role, id: user._id }, secretKey, {
            expiresIn: "2h"
        });

        res.send({ ok: true, data: { token } });
    } catch (err) {
        next(err)
    }
}

