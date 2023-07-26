import { convertToDate, convertToDbDate, getDateLiteral, getTimeIntervalLiteral, HOUR, isFuture, isPast } from './date'
import { expect } from '@/tests'

describe('utils/date', () => {
    const saturday11December2021_12h00 = 1639220400000
    const saturday11December2021_14h00 = 1639227600000

    describe('convertToDate', () => {
        it('should convert date to date', () => {
            const date = new Date(saturday11December2021_12h00)

            const res = convertToDate(date)

            expect(res).to.equal(date)
        })
        it('should convert date to string', () => {
            const date = new Date(saturday11December2021_12h00).toISOString()

            const res = convertToDate(date)

            expect(res).to.deep.equal(new Date(saturday11December2021_12h00))
        })
        it('should return invalid date to null', () => {
            const invalidDate = 'invalidDate'

            const res = convertToDate(invalidDate)

            expect(res).to.equal(null)
        })
    })
    describe('getTimeIntervalLiteral', () => {
        it('should get time literal with date', () => {
            const res = getDateLiteral(new Date(saturday11December2021_12h00))

            expect(res).to.equal('Le samedi 11 décembre')
        })
    })
    describe('getDateLiteral', () => {
        it('should get date literal with date', () => {
            const res = getTimeIntervalLiteral(new Date(saturday11December2021_12h00), new Date(saturday11December2021_14h00))

            expect(res).to.equal('de 12h00 à 14h00')
        })
        it('should get date literal with date', () => {
            const res = getTimeIntervalLiteral(
              new Date(saturday11December2021_12h00).toISOString(),
              new Date(saturday11December2021_14h00).toISOString(),
            )

            expect(res).to.equal('de 12h00 à 14h00')
        })
    })
    describe('isFuture', () => {
        it('should return true if the date is in the future', () => {
            const oneHourLater = new Date(Date.now() + (1 * HOUR))

            const res = isFuture(oneHourLater)

            expect(res).to.be.equal(true)
        })
        it('should return false if the date is in the past', () => {
            const oneHourAgo = new Date(Date.now() - (1 * HOUR))

            const res = isFuture(oneHourAgo)

            expect(res).to.be.equal(false)
        })
        it('should return false if the date is now', () => {
            const now = new Date(Date.now())

            const res = isFuture(now)

            expect(res).to.be.equal(false)
        })
    })
    describe('isPast', () => {
        it('should return true if the date is in the path', () => {
            const oneHourAgo = new Date(Date.now() - (1 * HOUR))

            const res = isPast(oneHourAgo)

            expect(res).to.be.equal(true)
        })
        it('should return false if the date is in the future', () => {
            const oneHourLater = new Date(Date.now() + (1 * HOUR))

            const res = isPast(oneHourLater)

            expect(res).to.be.equal(false)
        })
        it('should return false if the date is now', () => {
            const now = new Date(Date.now())

            const res = isPast(now)

            expect(res).to.be.equal(false)
        })
    })
    describe('convertToDbDate', () => {
        it('should return ISO string if a date is given', () => {
            const now = new Date()

            const res = convertToDbDate(now)

            expect(res).to.be.equal(now.toISOString())
        })
        it('should return ISO string if a string is given', () => {
            const now = '2021-12-12 23:45:12'

            const res = convertToDbDate(now)

            expect(res).to.be.equal(new Date(now).toISOString())
        })
        it('should throw error if date is invalid', async () => {
            const invalidDate = new Date('invalid')

            const res = new Promise(() => convertToDbDate(invalidDate))

            await expect(res).to.be.rejectedWith(Error, 'Invalid Date')
        })
        it('should throw error if string is an invalid date', async () => {
            const invalidDate = 'invalid'

            const res = new Promise(() => convertToDbDate(invalidDate))

           await  expect(res).to.be.rejectedWith(Error, 'Invalid Date')
        })
    })
})
