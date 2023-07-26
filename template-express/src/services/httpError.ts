import { HTTP_STATUS } from '@/enums'

class HttpError extends Error {
    description: string;
    level: string;
    httpStatus: string | number;
    key: string;

    constructor(message: string, httpStatus: string | number, key?: string) {
        super(message)
        this.name = this.constructor.name

        this.description = message
        this.level = 'HTTP ERROR'
        this.httpStatus = httpStatus
        this.key = key || 'NONE'

        //Error.captureStackTrace(this, this.constructor)
    }
}

function badRequest(message?: string, key?: string){
    return new HttpError(message || 'BAD REQUEST', HTTP_STATUS.BAD_REQUEST, key)
}
function conflict(message?: string, key?: string){
    return new HttpError(message || 'CONFLICT', HTTP_STATUS.CONFLICT, key)
}
function unauthorized(message?: string, key?: string){
    return new HttpError(message || 'UNAUTHORIZED', HTTP_STATUS.UNAUTHORIZED, key)
}
function notFound(message?: string, key?: string){
    return new HttpError(message || 'NOT FOUND', HTTP_STATUS.NOT_FOUND, key)
}
function forbidden(message?: string, key?: string){
    return new HttpError(message || 'FORBIDDEN', HTTP_STATUS.FORBIDDEN, key)
}
function internalServerError(message?: string, key?: string){
    return new HttpError(message || 'INTERNAL SERVER ERROR', HTTP_STATUS.INTERNAL_SERVER_ERROR, key)
}

export const httpErrorService = {
    HttpError,
    badRequest,
    conflict,
    unauthorized,
    notFound,
    forbidden,
    internalServerError
}
