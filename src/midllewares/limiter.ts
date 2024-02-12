import { rateLimit } from 'express-rate-limit'
import error from "../error"

const { TooManyRequestsError } = error

export const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	standardHeaders: 'draft-7',
	legacyHeaders: false, 
    limit: 100,
    handler: () => {
        throw new TooManyRequestsError() 
    }
})