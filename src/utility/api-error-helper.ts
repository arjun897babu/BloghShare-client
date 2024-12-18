import { AxiosError } from "axios";
import { AxiosErrorCode, ResponseStatus } from "../constants/enum";
import { ApiError, ErrorObject } from "./types";

export function createApiError(
    statusCode: number = 500,
    message: string = "unknown error",
    status: ResponseStatus = ResponseStatus.Error,
    error: ErrorObject = { common: message }
): ApiError {
    return {
        statusCode,
        status,
        message,
        error,
    };
}

export function isApiError(error: unknown): error is ApiError {
    return (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        "message" in error &&
        "error" in error &&
        typeof error.error === "object"
    );
}

export function handleAxiosError(error: unknown): ApiError {
    if (error instanceof AxiosError) {
        const { response = undefined, code } = error;

        let messge: string;
        switch (code) {
            case AxiosErrorCode.TIMEOUT:
                messge = 'Request timed out. Please try again later';
                break;
            case AxiosErrorCode.SERVER_ERROR:
                messge = 'Unable to connect to the server';
                break;
            default:
                messge = response?.data.message;
                break;
        }

        return createApiError(
            error.status,
            messge,
            response?.data.status,
            response?.data.error
        );
    }
    return createApiError();
}

export class CustomError extends Error {
    statusCode: number;
    err: ErrorObject;
    constructor(statusCode: number, err: ErrorObject) {
        super();
        this.statusCode = statusCode;
        this.err = err;
    }
}