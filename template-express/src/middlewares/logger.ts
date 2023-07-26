import { loggerService } from '@/services'
import { NextFunction, Request, Response } from '@/types'

function logger(req: Request, res: Response, next: NextFunction){
    const logInfos = {
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        method: req.method,
        url: req.url,
        status: res.statusCode,
    }

    if (process.env.NODE_ENV !== 'test') {
        loggerService.standardLogger.info(logInfos)
    }
    next()
}

const loggerMiddleware = {
    logger
}

export {
    loggerMiddleware
}
