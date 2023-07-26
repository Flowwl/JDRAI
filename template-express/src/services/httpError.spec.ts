import { httpErrorService } from './httpError'
import { expect } from '@/tests'

describe('service/httpError', () => {
    describe('HttpError', () => {
        it("should be well constructed", () => {
            const message = "test"
            const httpStatus = 400
            const key = "TOP"
            const error = new httpErrorService.HttpError(message, httpStatus, key)

            expect(error.description).to.be.equal(message)
            expect(error.httpStatus).to.be.equal(httpStatus)
            expect(error.key).to.be.equal(key)
        })
    })
    describe('badRequest', () => {
        it("should be instance of HttpError", () => {
            const error = httpErrorService.badRequest()

            expect(error).to.be.instanceOf(httpErrorService.HttpError)
        })
        it("should construct with default params", () => {
            const error = httpErrorService.badRequest()

            expect(error.description).to.be.equal('BAD REQUEST')
            expect(error.httpStatus).to.be.equal(400)
        })
        it("should construct with custom params", () => {
            const message = "test"
            const key = "TOP"
            const error = httpErrorService.badRequest(message, key)

            expect(error.description).to.be.equal(message)
            expect(error.httpStatus).to.be.equal(400)
            expect(error.key).to.be.equal(key)
        })
    })
    describe('conflict', () => {
        it("should be instance of HttpError", () => {
            const error = httpErrorService.conflict()

            expect(error).to.be.instanceOf(httpErrorService.HttpError)
        })
        it("should construct with default params", () => {
            const error = httpErrorService.conflict()

            expect(error.description).to.be.equal('CONFLICT')
            expect(error.httpStatus).to.be.equal(409)
        })
        it("should construct with custom params", () => {
            const message = "test"
            const key = "TOP"
            const error = httpErrorService.conflict(message, key)

            expect(error.description).to.be.equal(message)
            expect(error.httpStatus).to.be.equal(409)
            expect(error.key).to.be.equal(key)
        })
    })
    describe('unauthorized', () => {
        it("should be instance of HttpError", () => {
            const error = httpErrorService.unauthorized()

            expect(error).to.be.instanceOf(httpErrorService.HttpError)
        })
        it("should construct with default params", () => {
            const error = httpErrorService.unauthorized()

            expect(error.description).to.be.equal('UNAUTHORIZED')
            expect(error.httpStatus).to.be.equal(401)
        })
        it("should construct with custom params", () => {
            const message = "test"
            const key = "TOP"
            const error = httpErrorService.unauthorized(message, key)

            expect(error.description).to.be.equal(message)
            expect(error.httpStatus).to.be.equal(401)
            expect(error.key).to.be.equal(key)
        })
    })
    describe('notFound', () => {
        it("should be instance of HttpError", () => {
            const error = httpErrorService.notFound()

            expect(error).to.be.instanceOf(httpErrorService.HttpError)
        })
        it("should construct with default params", () => {
            const error = httpErrorService.notFound()

            expect(error.description).to.be.equal('NOT FOUND')
            expect(error.httpStatus).to.be.equal(404)
        })
        it("should construct with custom params", () => {
            const message = "test"
            const key = "TOP"
            const error = httpErrorService.notFound(message, key)

            expect(error.description).to.be.equal(message)
            expect(error.httpStatus).to.be.equal(404)
            expect(error.key).to.be.equal(key)
        })
    })
    describe('forbidden', () => {
        it("should be instance of HttpError", () => {
            const error = httpErrorService.forbidden()

            expect(error).to.be.instanceOf(httpErrorService.HttpError)
        })
        it("should construct with default params", () => {
            const error = httpErrorService.forbidden()

            expect(error.description).to.be.equal('FORBIDDEN')
            expect(error.httpStatus).to.be.equal(403)
        })
        it("should construct with custom params", () => {
            const message = "test"
            const key = "TOP"
            const error = httpErrorService.forbidden(message, key)

            expect(error.description).to.be.equal(message)
            expect(error.httpStatus).to.be.equal(403)
            expect(error.key).to.be.equal(key)
        })
    })
    describe('internalServerError', () => {
        it("should be instance of HttpError", () => {
            const error = httpErrorService.internalServerError()

            expect(error).to.be.instanceOf(httpErrorService.HttpError)
        })
        it("should construct with default params", () => {
            const error = httpErrorService.internalServerError()

            expect(error.description).to.be.equal('INTERNAL SERVER ERROR')
            expect(error.httpStatus).to.be.equal(500)
        })
        it("should construct with custom params", () => {
            const message = "test"
            const key = "TOP"
            const error = httpErrorService.internalServerError(message, key)

            expect(error.description).to.be.equal(message)
            expect(error.httpStatus).to.be.equal(500)
            expect(error.key).to.be.equal(key)
        })
    })
})
