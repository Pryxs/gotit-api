import { ILesson, Lesson } from './lessons.model'
import error from "../../error"

const { NotFoundError } = error

const getLesson = async (filter: { [key: string]: string}, exclusion?: string): Promise<ILesson | null> => {
    const lesson = await Lesson.findOne(filter, exclusion);

    if (!lesson) throw new NotFoundError();

    return lesson;
}

const getLessons = async (filter: { [key: string]: string} = {}, exclusion?: string): Promise<ILesson[]> => {
    const lessons = await Lesson.find(filter, exclusion);

    if (!lessons.length) throw new NotFoundError();

    return lessons;
}

const createLesson = async (data: Omit<ILesson, 'id'>): Promise<ILesson> => await new Lesson(data).save();

const updateLesson = async (id: string, data: Omit<ILesson, 'id'>): Promise<ILesson> => {
    const lesson = await Lesson.findByIdAndUpdate(id, data, { new: true })

    if (!lesson) throw new NotFoundError();

    return lesson;
}

const deleteLesson = async (id: string) => await Lesson.deleteOne({ _id: id })

export default {
    getLesson,
    getLessons,
    createLesson,
    updateLesson,
    deleteLesson,
};
