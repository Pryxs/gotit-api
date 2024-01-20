import { IUser, User } from './users.model'
import BcryptHelper from '../../utils/bcrypt.helper'
import error from "../../error"

const { NotFoundError } = error
const { encrypt, decrypt } = BcryptHelper

const getUser = async (filter: { [key: string]: string}, exclusion?: string): Promise<IUser | null> => {
    const user = await User.findOne(filter, exclusion);

    if (!user) throw new NotFoundError();

    return user;
}

const getUsers = async (filter: { [key: string]: string} = {}, exclusion?: string): Promise<IUser[]> => {
    const users = await User.find(filter, exclusion);

    if (!users.length) throw new NotFoundError();

    return users;
}

const createUser = async (data: Omit<IUser, 'id'>): Promise<IUser> => {
    const hash: string | void = await encrypt(data.password)

    const newUser = new User({
        ...data,
        password: hash,
    })

    return await newUser.save();
}

const updateUser = async (id: string, data: Omit<IUser, 'id'>): Promise<IUser> => {
    const user = await User.findByIdAndUpdate(id, data, { new: true, select: '-password' })

    if (!user) throw new NotFoundError();

    return user;
}

const deleteUser = async (id: string) => await User.deleteOne({ _id: id })

export default {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};
