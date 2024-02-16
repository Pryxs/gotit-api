import { IModule, Module } from './modules.model'
import error from "../../error"
import { IUser } from '../users/users.model'
import { ICategory } from '../categories/categories.model'
import { TokenType } from '../../types'
import { ILesson } from '../lessons/lessons.model'

const { NotFoundError } = error

type PopulatedModuleByUser = IModule & { author: IUser}
type PopulatedModuleByCategory = IModule & { categories: ICategory[]}
type PopulatedModuleByLesson = IModule & { categories: ILesson[]}

const getModule = async (filter: Record<string, string>, exclusion?: string): Promise<IModule> => {
    const module = await Module.findOne(filter, exclusion)
        .populate<Pick<PopulatedModuleByUser, 'author'>>('author')
        .populate<Pick<PopulatedModuleByLesson, 'lessons'>>('lessons')
        .populate<Pick<PopulatedModuleByCategory, 'categories'>>('categories')
        .exec();

    if (!module) throw new NotFoundError();

    return module;
}

const getModules = async (filter: Record<string, any> = {}, exclusion?: string): Promise<IModule[]> => {
    const modules = await Module.find(filter, exclusion)
        .populate<Pick<PopulatedModuleByUser, 'author'>>('author')
        .populate<Pick<PopulatedModuleByLesson, 'lessons'>>('lessons')
        .populate<Pick<PopulatedModuleByCategory, 'categories'>>('categories')
        .exec();

    if (!modules.length) throw new NotFoundError();

    return modules;
}

const createModule = async (data: Omit<IModule, 'id'>, user: TokenType): Promise<IModule> => {
    return await new Module({...data, author: user.id}).save();
}

const updateModule = async (id: string, data: Omit<IModule, 'id'>): Promise<IModule> => {
    const module = await Module.findByIdAndUpdate(id, data, { new: true })

    if (!module) throw new NotFoundError();

    return module;
}

const deleteModule = async (id: string) => await Module.deleteOne({ _id: id })

export default {
    getModule,
    getModules,
    createModule,
    updateModule,
    deleteModule,
};
