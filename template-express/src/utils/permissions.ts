import { User } from '@/components/users/types';
import { PERMISSIONS, ROLES_WITH_PERMISSIONS } from '@/enums';

export function getPermissionListForRoleId(roleId: User["roleId"]) {
    return ROLES_WITH_PERMISSIONS[roleId] || [];
}

export function hasPermission(user: User, perm: PERMISSIONS) {
  return getPermissionListForRoleId(user.roleId).includes(perm);
}
