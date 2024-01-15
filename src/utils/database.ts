import mongoose from "mongoose";

const dbConnect = async (): Promise<typeof mongoose | undefined> => {
    const url: string | undefined = process.env.DB_URL;

    try {
        if (!url) throw new Error('Empty database url')

        return await mongoose.connect(url);
    } catch (err) {
        let msg;
        if (err instanceof Error) msg = err.message

        console.error(msg)
    }
}

export default dbConnect
