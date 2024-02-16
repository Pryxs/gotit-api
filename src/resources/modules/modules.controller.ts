import type { IResponse } from '../../types'
import { IModule } from './modules.model'
import type { NextFunction, Request, Response } from "express";
import ModuleService from './modules.service';
import { regexDiacriticSupport } from '../../utils/diacriticSupport';
import { LessonQueryType } from '../../types';

const { createModule, getModule, getModules, updateModule, deleteModule } = ModuleService

export const get = async (req: Request<{ id: string }>, res: Response<IResponse<IModule | null>>, next: NextFunction) => {
    try {
        const { id } = req.params;

        const module = await getModule({ _id: id });

        res.status(200).json({ ok: true, data: module })
    } catch (err) {
        next(err)
    }
}

export const getAll = async (req: Request<unknown, unknown, unknown, LessonQueryType>, res: Response<IResponse<IModule[]>>, next: NextFunction) => {
    try {
        const {q, status, author} = req.query;
        const query = {
            title: {
                $regex: regexDiacriticSupport(q ?? ''),
            },
            ...(status === 'public' && {
                status: {
                    $not: new RegExp('private')
                },
            }),
            ...(author && {
                author,
            })
        }

        const modules = await getModules(query)

        res.status(200).json({ ok: true, data: modules })
    } catch (err) {
        next(err)
    }
};

export const create = async (req: Request<{}, {}, Omit<IModule, 'id'>>, res: Response<IResponse<IModule>>, next: NextFunction) => {
    try {
        const module = await createModule(req.body);
        res.status(201).json({ ok: true, data: module })
    } catch (err) {
        next(err)
    }
};

export const update = async (req: Request<{ id: string }>, res: Response<IResponse<IModule>>, next: NextFunction) => {
    try {
        const { id } = req.params;

        const module = await updateModule(id, req.body)

        res.status(200).json({ok: true,  data: module })
    } catch (err) {
        next(err)
    }
};

export const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        await deleteModule(id)

        res.status(204).send();
    } catch (err) {
        next(err)
    }
}
