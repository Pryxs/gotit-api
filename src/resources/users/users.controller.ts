import type { IResponse } from '../../types'
import { IUser, User } from './users.model'
import type { NextFunction, Request, Response } from "express";
import error from "../../error"
import UserService from './users.service';

const { createUser, getUser } = UserService
const { BadRequestError } = error


export const get = async (req: Request<{ id: string }>, res: Response<IResponse<IUser>>, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!id) throw new BadRequestError()

        const user = await getUser(id);

        res.status(201).json({ data: user })
    } catch (err) {
        next(err)
    }
}

export const getAll = async (req: Request, res: Response<IResponse<IUser[]>>) => {
    try {
        const users = await User.find()

        res.status(200).json({ data: users })
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' })
    }
};

export const create = async (req: Request<{}, {}, Omit<IUser, 'id'>>, res: Response<IResponse<IUser>>, next: NextFunction) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json({ data: user })
    } catch (err) {
        next(err)
    }
};

export const update = async (req: Request<{ id: string }>, res: Response<IResponse<IUser>>) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true })

        if (!user) return res.status(404).json({ error: 'User not found' })

        res.status(200).json({ data: user })
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' })
    }
};

export const remove = async (req: Request<{ id: string }>, res: Response<IResponse<{ id: string }>>) => {
    const { id } = req.params;

    try {
        await User.deleteOne({ _id: id })

        res.status(200).json({ data: { id } })
    } catch (err) {

        res.status(500).json({ error: 'Internal server error' })
    }
}
