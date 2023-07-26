import { IsNumber, IsString } from 'class-validator'
import { validateAndConvert } from './validation'
import { expect } from '@/tests'

describe("utils/validation", () => {
  describe("validateAndConvert", () => {
    it("should pass if valid", () => {
      class Valid {
        @IsString()
        testField
      }

      const promise = validateAndConvert(Valid, { testField: "test" })

      expect(promise).to.be.fulfilled
    })
    it("should throw with error message if invalid", () => {
      class Invalid {
        @IsNumber({}, { message: "should be a number" })
        testField
      }

      const promise = validateAndConvert(Invalid, { testField: "test" })

      expect(promise).to.be.rejectedWith(Error, `Request validation failed: should be a number`)
    })
  })
})
