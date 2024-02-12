import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import type { ObjectId } from 'mongodb';

export type ILesson = {
    title: string,
    author: ObjectId,
    content: string,
    status: 'public' | 'private',
}

const lessonSchema = new Schema<ILesson>({
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
    // TODO : richText ? 
    content: {
        type: String,
        required: true
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

lessonSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

export const Lesson = model<ILesson>('lesson', lessonSchema)