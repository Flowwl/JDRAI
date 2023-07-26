import { projectConfig } from '@/config';
import { CookieOptions } from 'express';

const authConfig = {
    secret: projectConfig.JWT_API_KEY,
    expiration: projectConfig.EXPIRATION_TOKEN || 86400,
    cookieConfig: {
        httpOnly: true, // to disable accessing cookie via client side js
        // secure: true, // to force https (if you use it)
        maxAge: projectConfig.EXPIRATION_TOKEN || 86400, // ttl in seconds (remove this option and cookie will die when browser is closed)
        signed: true, // if you use the secret with cookieParser
    }  as CookieOptions,
}

export {
    authConfig
}
