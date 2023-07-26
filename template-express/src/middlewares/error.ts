import { NextFunction, Request, Response } from '@/types'
import { loggerService, httpErrorService } from '@/services'
import { HTTP_STATUS, MESSAGES } from '@/enums'

function handleError(err: any, req: Request, res: Response, next:NextFunction) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    let body = {
        key: err.key,
        error: err.message,
        code: err.errorCode
    }

    if (process.env.NODE_ENV !== 'test') {
        if (err instanceof httpErrorService.HttpError) {
            loggerService.httpErrorLogger.error({ ...err, path: req.originalUrl, ip })
        } else {
            loggerService.criticalLogger.error(err)
            body = {
                ...body,
                error: MESSAGES.databaseError
            }
        }
    }

    // render the error page
    if (res.headersSent) {
        return next(err)
    }

    return res.status(err.httpStatus || HTTP_STATUS.BAD_REQUEST).send(body)
}

export const errorMiddleware = {
    handleError
}
