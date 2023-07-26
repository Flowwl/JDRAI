import { expect } from '@/tests'
import { PERMISSIONS, ROLES, ROLES_WITH_PERMISSIONS } from '@/enums';
import { User } from '@/components/users'
import { getPermissionListForRoleId, hasPermission } from '@/utils/permissions'

describe('utils/permissions', () => {
    const exampleUser =  {
        roleId: ROLES.USER
    }

    const adminUser = {
        roleId: ROLES.ADMIN
    }
    describe('getPermissionListForRoleId', () => {
        it("should return simple user permission", () => {
            const res = getPermissionListForRoleId(exampleUser.roleId)

            expect(res).to.deep.equal(ROLES_WITH_PERMISSIONS[ROLES.USER])
        })
        it("should return admin user permission", () => {
            const res = getPermissionListForRoleId(adminUser.roleId)

            expect(res).to.deep.equal(ROLES_WITH_PERMISSIONS[ROLES.ADMIN])
        })
        it("should return empty array when id doesn't exist", () => {
            const res = getPermissionListForRoleId(7)

            expect(res).to.deep.equal([])
        })
    })
    describe('hasPermission', () => {
        it("should have perms for admin", () => {
            const res = hasPermission(adminUser as User, PERMISSIONS.CAN_FIND_ALL_USERS)

            expect(res).to.be.true
        })
        it("should not have perms for simple user", () => {
            const res = hasPermission(exampleUser as User, PERMISSIONS.CAN_FIND_ALL_USERS)

            expect(res).to.be.false
        })
    })
})
