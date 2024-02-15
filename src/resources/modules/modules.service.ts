import { IModule, Module } from './modules.model'
import error from "../../error"

const { NotFoundError } = error

const getModule = async (filter: Record<string, string>, exclusion?: string): Promise<IModule> => {
    const module = await Module.findOne(filter, exclusion);

    if (!module) throw new NotFoundError();

    return module;
}

const getModules = async (filter: Record<string, any> = {}, exclusion?: string): Promise<IModule[]> => {
    const modules = await Module.find(filter, exclusion);

    if (!modules.length) throw new NotFoundError();

    return modules;
}

const createModule = async (data: Omit<IModule, 'id'>): Promise<IModule> => await new Module(data).save();

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
