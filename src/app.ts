import express, { Express, Request, Response, NextFunction } from "express";
import dbConnect from './utils/database'
import dotenv from "dotenv";
import { UserRouter } from './resources/users/users.routes'
import { LessonRouter } from './resources/lessons/lessons.routes'
import error from "./error"
import { limiter } from "./midllewares/limiter";

const { CustomError } = error

dotenv.config();

const app: Express = express();

dbConnect()

app.use(limiter);


app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/api/v1/users', UserRouter)
app.use('/api/v1/lessons', LessonRouter)

app.use('*', (req: Request, res: Response) => {
    res.status(404).json('Are you lost ?');
})

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    let code: number = 500;
    if (error instanceof CustomError) code = error.code
    res.status(code).json({ ok: false, error: error.message });
})

export default app;


