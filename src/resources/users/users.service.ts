import { IUser, User } from './users.model'
import BcryptHelper from '../../utils/bcrypt.helper'
import error from "../../error"

const { NotFoundError } = error
const { encrypt, decrypt } = BcryptHelper

const getUser = async (id: string): Promise<IUser> => {
    const user = await User.findById(id);

    if (!user) throw new NotFoundError();

    return user;
}

const createUser = async (data: Omit<IUser, 'id'>): Promise<IUser> => {
    const hash: string | void = await encrypt(data.password)

    const newUser = new User({
        ...data,
        password: hash,
    })

    return await newUser.save();
}

export default {
    getUser,
    createUser,
};
