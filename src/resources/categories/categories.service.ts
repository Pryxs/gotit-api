import { ICategory, Category } from './categories.model'
import error from "../../error"

const { NotFoundError } = error

const getCategory = async (filter: Record<string, string>, exclusion?: string): Promise<ICategory> => {
    const category = await Category.findOne(filter, exclusion);

    if (!category) throw new NotFoundError();

    return category;
}

const getCategories = async (filter: Record<string, any> = {}, exclusion?: string): Promise<ICategory[]> => {
    const categories = await Category.find(filter, exclusion);

    if (!categories.length) throw new NotFoundError();

    return categories;
}

const createCategory = async (data: Omit<ICategory, 'id'>): Promise<ICategory> => await new Category(data).save();

const updateCategory = async (id: string, data: Omit<ICategory, 'id'>): Promise<ICategory> => {
    const category = await Category.findByIdAndUpdate(id, data, { new: true })

    if (!category) throw new NotFoundError();

    return category;
}

const deleteCategory = async (id: string) => await Category.deleteOne({ _id: id })

export default {
    getCategory,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};
