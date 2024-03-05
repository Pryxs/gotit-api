import type { IResponse } from '../../types'
import { IUser } from './users.model'
import type { NextFunction, Request, Response } from "express";
import UserService from './users.service';
import { regexDiacriticSupport } from '../../utils/diacriticSupport';
import { UserQueryType } from '../../types';

const { createUser, getUser, getUsers, updateUser, deleteUser } = UserService

export const get = async (req: Request<{ id: string }>, res: Response<IResponse<IUser | null>>, next: NextFunction) => {
    try {
        const { id } = req.params;

        const user = await getUser({ _id: id }, '-password');

        res.status(200).json({ ok: true, data: user })
    } catch (err) {
        next(err)
    }
}

export const getAll = async (req: Request<unknown, unknown, unknown, UserQueryType>, res: Response<IResponse<IUser[]>>, next: NextFunction) => {
    try {
        const { q, role } = req.query;
        const query = {
            $or: [
                { username: { $regex: regexDiacriticSupport(q ?? '') } },
                { 'profile.firstName': { $regex: regexDiacriticSupport(q ?? '') } },
                { 'profile.name': { $regex: regexDiacriticSupport(q ?? '') } }
            ],
            ...(role && {
                role: role,
            })
        }

        const users = await getUsers(query, '-password')

        res.status(200).json({ ok: true, data: users })
    } catch (err) {
        next(err)
    }
};

export const create = async (req: Request<{}, {}, Omit<IUser, 'id'>>, res: Response<IResponse<IUser>>, next: NextFunction) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json({ ok: true, data: user })
    } catch (err) {
        next(err)
    }
};

export const update = async (req: Request<{ id: string }>, res: Response<IResponse<IUser>>, next: NextFunction) => {
    try {
        const { id } = req.params;
        delete req.body.password;

        const user = await updateUser(id, req.body)

        res.status(200).json({ ok: true, data: user })
    } catch (err) {
        next(err)
    }
};

export const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const t = await deleteUser(id)
        console.log(id)

        res.status(204).send();
    } catch (err) {
        next(err)
    }
}
