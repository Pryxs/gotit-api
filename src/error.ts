class CustomError extends Error {
    code: number;
    constructor(message: string, code: number) {
        super(message);
        this.code = code;
    }
}

class UnauthorizedError extends CustomError {
    constructor() {
        super('Unauthorized', 403);
    }
}

class NotFoundError extends CustomError {
    constructor() {
        super('Not Found', 404);
    }
}

class BadRequestError extends CustomError {
    constructor(message?: string) {
        super(`Bad Request ${message ? ` : ${message}` : ''}`, 400);
    }
}

class TooManyRequestsError extends CustomError {
    constructor() {
        super('API usage limit exceeded. Please try again later', 429);
    }
}

export default {
    UnauthorizedError,
    NotFoundError,
    BadRequestError,
    TooManyRequestsError,
    CustomError,
};