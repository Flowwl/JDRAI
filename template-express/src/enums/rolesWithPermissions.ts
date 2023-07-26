import { PERMISSIONS } from './permissions';
import { ROLES } from './roles';

const ROLES_WITH_PERMISSIONS: Record<ROLES, PERMISSIONS[]> = {
    [ROLES.USER]: [
        PERMISSIONS.CAN_LOGIN,
        PERMISSIONS.CAN_FIND_SELF,
        PERMISSIONS.CAN_UPDATE_SELF,
    ],
    [ROLES.ADMIN]: Object.values(PERMISSIONS)
};

export {
    ROLES_WITH_PERMISSIONS
};
