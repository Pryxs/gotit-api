import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export type ICategory = {
    name: string,
}

const moduleSchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        unique: true
    },
}, {
    versionKey: false
})

moduleSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

export const Category = model<ICategory>('categories', moduleSchema)