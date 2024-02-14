import type { IResponse } from '../../types'
import { ILesson } from './lessons.model'
import type { NextFunction, Request, Response } from "express";
import LessonService from './lessons.service';

const { createLesson, getLesson, getLessons, updateLesson, deleteLesson } = LessonService

export const get = async (req: Request<{ id: string }>, res: Response<IResponse<ILesson | null>>, next: NextFunction) => {
    try {
        const { id } = req.params;

        const lesson = await getLesson({ _id: id });

        res.status(200).json({ ok: true, data: lesson })
    } catch (err) {
        next(err)
    }
}

export const getAll = async (req: Request, res: Response<IResponse<ILesson[]>>, next: NextFunction) => {
    try {
        const lessons = await getLessons()

        res.status(200).json({ ok: true, data: lessons })
    } catch (err) {
        next(err)
    }
};

export const create = async (req: Request<{}, {}, Omit<ILesson, 'id'>>, res: Response<IResponse<ILesson>>, next: NextFunction) => {
    try {
        const lesson = await createLesson(req.body);
        res.status(201).json({ ok: true, data: lesson })
    } catch (err) {
        next(err)
    }
};

export const update = async (req: Request<{ id: string }>, res: Response<IResponse<ILesson>>, next: NextFunction) => {
    try {
        const { id } = req.params;

        const lesson = await updateLesson(id, req.body)

        res.status(200).json({ok: true,  data: lesson })
    } catch (err) {
        next(err)
    }
};

export const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        await deleteLesson(id)

        res.status(204).send();
    } catch (err) {
        next(err)
    }
}
