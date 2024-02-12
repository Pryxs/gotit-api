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

export default {
    UnauthorizedError,
    NotFoundError,
    BadRequestError,
    CustomError
};