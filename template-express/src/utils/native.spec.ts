import { convertEntries, removeUndefinedValuesFromObject } from '@/utils/native'
import { expect } from '@/tests'

describe("utils/native", () => {
  describe('removeUndefinedValuesFromObject', () => {
    it("should return undefined values from object", () => {
      const obj = {
        roleId: 2,
        test: undefined
      }

      const res = removeUndefinedValuesFromObject(obj)

      expect(res).to.deep.equal({
        roleId: 2
      })
    })
  })
  describe("convertEntries", () => {
    it("should convert object values", () => {
      const obj = {
        roleId: 2
      }

      const res = convertEntries(obj, ([key, value]) => [key, value.toString()])

      expect(res).to.deep.equal({
        roleId: "2"
      })
    })
  })
})
