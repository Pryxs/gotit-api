import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import type { ObjectId } from 'mongoose';

export type IModule = {
    title: string,
    author: ObjectId,
    level: number,
    lessons: ObjectId[],
    categories: ObjectId[],
    status: 'public' | 'private',
}

const moduleSchema = new Schema<IModule>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    level: {
        type: Number,
        required: true
    },
    lessons: {
        type: [Schema.Types.ObjectId],
        ref: 'lessons',
        required: true,
    },
    categories: {
        type: [Schema.Types.ObjectId],
        ref: 'categories',
    },
    status: {
        type: String,
        enum : ['public', 'private'],
        default: 'private',
        required: true
    },
}, {
    versionKey: false
})

moduleSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

export const Module = model<IModule>('modules', moduleSchema)