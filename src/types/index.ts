import { AsyncValidationOptions, ValidationError, ValidationOptions } from "joi";

export type IResponse<TData> = {
    ok: true;
    data: TData
} | {
    ok: false;
    error: string;
}

export interface ValidationResult<TResult = any> {
    value: TResult;
    error?: ValidationError;
    warning?: ValidationError;
}

export interface ObjectSchema<TSchema = any> {
    validate(value: any, options?: ValidationOptions): ValidationResult<TSchema>;
    validateAsync(value: any, options?: AsyncValidationOptions): Promise<TSchema>;
}

export type TokenType = {
    email: string;
    role: string;
}

export type LessonQueryType = {
    q?: string;
    status?: 'pivate' | 'public';
}

export type UserQueryType = {
    q?: string;
    role?: 'user' | 'editor' | 'admin';
}