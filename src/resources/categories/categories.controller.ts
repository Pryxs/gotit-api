import type { IResponse } from '../../types'
import { ICategory } from './categories.model'
import type { NextFunction, Request, Response } from "express";
import ModuleService from './categories.service';
import { LessonQueryType } from '../../types';

const { createCategory, getCategory, getCategories, updateCategory, deleteCategory } = ModuleService

export const get = async (req: Request<{ id: string }>, res: Response<IResponse<ICategory | null>>, next: NextFunction) => {
    try {
        const { id } = req.params;

        const category = await getCategory({ _id: id });

        res.status(200).json({ ok: true, data: category })
    } catch (err) {
        next(err)
    }
}

export const getAll = async (req: Request<unknown, unknown, unknown, LessonQueryType>, res: Response<IResponse<ICategory[]>>, next: NextFunction) => {
    try {
        const modules = await getCategories()

        res.status(200).json({ ok: true, data: modules })
    } catch (err) {
        next(err)
    }
};

export const create = async (req: Request<{}, {}, Omit<ICategory, 'id'>>, res: Response<IResponse<ICategory>>, next: NextFunction) => {
    try {
        const category = await createCategory(req.body);
        res.status(201).json({ ok: true, data: category })
    } catch (err) {
        next(err)
    }
};

export const update = async (req: Request<{ id: string }>, res: Response<IResponse<ICategory>>, next: NextFunction) => {
    try {
        const { id } = req.params;

        const category = await updateCategory(id, req.body)

        res.status(200).json({ok: true,  data: category })
    } catch (err) {
        next(err)
    }
};

export const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        await deleteCategory(id)

        res.status(204).send();
    } catch (err) {
        next(err)
    }
}
