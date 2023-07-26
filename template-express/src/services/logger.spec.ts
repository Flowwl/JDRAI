import { expect } from '@/tests'
import { loggerService } from './logger'
import * as fs from 'fs'
import { httpErrorService } from './httpError'

describe('service/logger', () => {
    describe('criticalLogger', () => {
        const filePath = 'logs/criticalError.log'
        after(() => {
            fs.unlinkSync(filePath)
        })
        it("should be defined", () => {
            expect(loggerService.criticalLogger).not.to.be.undefined
        })
        it("should log in file", () => {
            const now = new Date()
            loggerService.criticalLogger.error('Logging unique timestamp ' + now)

            const content = fs.readFileSync(filePath, 'utf8')
            expect(content).not.to.be.empty
        })
    })
    describe('standardLogger', () => {
        const filePath = 'logs/standard.log'
        after(() => {
            fs.unlinkSync(filePath)
        })
        it("should be defined", () => {
            expect(loggerService.standardLogger).not.to.be.undefined
        })
        it("should log in file", () => {
            loggerService.standardLogger.error({
                ip: "test",
                method: "req.method",
                url: "req.url",
                status: "res.statusCode",
            })

            const content = fs.readFileSync(filePath, 'utf8')
            expect(content).not.to.be.empty
        })
    })
    describe('stripeErrorLogger', () => {
        const filePath = 'logs/stripeError.log'
        after(() => {
            fs.unlinkSync(filePath)
        })
        it("should be defined", () => {
            expect(loggerService.stripeErrorLogger).not.to.be.undefined
        })
        it("should log in file", () => {
            const now = new Date()
            const err = new Error( 'Logging unique timestamp ' + now)
            loggerService.stripeErrorLogger.error({ raw: { message: err.message }})

            const content = fs.readFileSync(filePath, 'utf8')
            expect(content).not.to.be.empty
        })
    })
    describe('httpErrorLogger', () => {
        const filePath = 'logs/httpError.log'
        after(() => {
            fs.unlinkSync(filePath)
        })
        it("should be defined", () => {
            expect(loggerService.httpErrorLogger).not.to.be.undefined
        })
        it("should log in file", () => {
            const now = new Date()
            loggerService.httpErrorLogger.error({ ...new httpErrorService.HttpError('Logging unique timestamp ' + now, 400) })

            const content = fs.readFileSync(filePath, 'utf8')
            expect(content).not.to.be.empty
        })
    })
})
