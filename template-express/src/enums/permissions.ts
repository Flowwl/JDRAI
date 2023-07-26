enum PERMISSIONS {
    // USERS
    CAN_LOGOUT = 'user can logout',
    CAN_LOGIN = 'user can login',
    CAN_FIND_ALL_USERS = 'user can find all users',
    CAN_FIND_ONE_USER_BY_ID = 'user can find one user by id',

    CAN_CREATE_USER = 'user can create a user',
    CAN_UPDATE_USER = 'user can update another user',
    CAN_DELETE_USER = 'user can delete another user',

    CAN_DELETE_SELF = 'user can delete self',
    CAN_FIND_SELF = 'user can find self',
    CAN_UPDATE_SELF = 'user can update self',
}

export {
    PERMISSIONS
}
