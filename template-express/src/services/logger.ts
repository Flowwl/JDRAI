import * as winston from 'winston'
import { TransformableInfo } from 'logform'

const criticalLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.printf((i) => {
            const { message, level = 'CRITICAL ERROR' } = i
            return `${ i.timestamp } ${ level.toUpperCase() } | ${ message }`
        }),
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/criticalError.log' }),
    ],
})

type standardInfos = TransformableInfo & {
    message: TransformableInfo
}
const standardLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.printf((i) => {
            const { level = '', message: { method, url, ip, status, message } } = i as standardInfos
            return `${ i.timestamp } ${ level.toUpperCase() } | ${ method } ${ url } ${ status } | ${ ip } `
        }),
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/standard.log' }),
    ],
})

type HttpInfos = TransformableInfo & {
    message: TransformableInfo
}
const httpErrorLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.printf((i) => {
            const { message: { description, level = "", httpStatus, path = '', ip } } = i as HttpInfos
            // eslint-disable-next-line max-len
            return `${ i.timestamp } ${ level.toUpperCase() } ${ httpStatus || '' } | ${ description } ${ path ? `ON ${ path }` : '' } | ${ ip ? `IP: ${ ip }` : '' } `
        }),
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/httpError.log' }),
    ],
})
const stripeErrorLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.printf((i) => {
            const {
                message: {
                    statusCode,
                    requestId,
                    type,
                    ip,
                    path,
                    raw: { message: errMessage }
                }
            } = i as HttpInfos
            // eslint-disable-next-line max-len
            return `${ i.timestamp } ${ type } ${ statusCode || '' } WITH REQUEST_ID: ${ requestId } | ${ errMessage } ${ path ? `ON ${ path }` : '' } | ${ ip ? `IP: ${ ip }` : '' }`
        }),
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/stripeError.log' }),
    ],
})


const loggerService = {
    criticalLogger,
    httpErrorLogger,
    standardLogger,
    stripeErrorLogger
}


export {
    loggerService
}
