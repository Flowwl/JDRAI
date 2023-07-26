import status from 'http-status-codes'

const HTTP_STATUS = {
    FORBIDDEN: status.FORBIDDEN,
    BAD_GATEWAY: status.BAD_GATEWAY,
    NOT_FOUND: status.NOT_FOUND,
    UNAUTHORIZED: status.UNAUTHORIZED,
    BAD_REQUEST: status.BAD_REQUEST,
    CONFLICT: status.CONFLICT,
    INTERNAL_SERVER_ERROR: status.INTERNAL_SERVER_ERROR,
}

export {
    HTTP_STATUS
}
