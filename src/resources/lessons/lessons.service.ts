import { ILesson, Lesson } from './lessons.model'
import error from "../../error"
import { TokenType } from '../../types';
import { mustBeOwner } from '../../utils/query.helper'

const { NotFoundError } = error

const getLesson = async (filter: Record<string, string>, exclusion?: string): Promise<ILesson> => {
    const lesson = await Lesson.findOne(filter, exclusion);

    if (!lesson) throw new NotFoundError();

    return lesson;
}

const getLessons = async (filter: Record<string, any> = {}, exclusion?: string): Promise<ILesson[]> => {
    const lessons = await Lesson.find(filter, exclusion);

    if (!lessons.length) throw new NotFoundError();

    return lessons;
}

const createLesson = async (data: Omit<ILesson, 'id'>, user: TokenType): Promise<ILesson> => {
    return await new Lesson({...data, author: user.id}).save();
}

const updateLesson = async (id: string, data: Omit<ILesson, 'id'>, user: TokenType): Promise<ILesson> => {
    const lesson = await Lesson.findOneAndUpdate({
        _id: id,
        ...mustBeOwner(user)
    }, data, { new: true })

    if (!lesson) throw new NotFoundError();

    return lesson;
}

const deleteLesson = async (id: string, user: TokenType) => await Lesson.deleteOne({ _id: id, ...mustBeOwner(user)})

export default {
    getLesson,
    getLessons,
    createLesson,
    updateLesson,
    deleteLesson,
};
