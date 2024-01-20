import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export type IUser = {
    username: string,
    email: string,
    password: string,
    role: 'user' | 'editor' | 'admin',
    profile: {
        firstName: string,
        name: string,
        birthdate: string,
    }
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        validate: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    role: {
        type: String,
        enum : ['user', 'editor', 'admin'],
        default: 'user',
        required: true
    },
    profile: {
        type: {
            firstName: String,
            name: String,
            birthdate: String,
        },
        required: true
    }
}, {
    versionKey: false
})

userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

export const User = model<IUser>('user', userSchema)