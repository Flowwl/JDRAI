import { bcryptService } from './bcrypt'
import { expect } from '@/tests'

describe('service/bcrypt', () => {
    describe('encryptPassword', () => {
        it('should be encrypted', () => {
            const password = "aebneif"

            const res = bcryptService.encryptPassword(password)

            expect(res).not.to.be.equal(password)
        })
    })
    describe('comparePassword', () => {
        it("should return true when password are the same", () => {
            const [password1, password2] = ["passer", bcryptService.encryptPassword("passer")]

            const res = bcryptService.comparePassword(password1, password2)

            expect(res).to.be.true
        })
        it("should return false when password are different", () => {
            const [password1, password2] = ["pass", "passzert"]

            const res = bcryptService.comparePassword(password1, password2)

            expect(res).to.be.false
        })
    })
})
