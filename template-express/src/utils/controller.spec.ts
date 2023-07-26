import { authedCr } from './controller'
import { expect } from '@/tests'

describe('controller/utils', () => {
    it("should return a function", () => {
        const controller = () => {return;}

        const newCr = authedCr(controller)

        expect(newCr).to.be.instanceOf(Function)
    })
})
