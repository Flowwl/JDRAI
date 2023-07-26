import { authMiddleware } from '@/middlewares/auth';
import { Router } from 'express';
import { PERMISSIONS } from '@/enums';
import { authController } from './controllers';
import { authedCr } from '@/utils';

const authRouter = Router()

authRouter.post('/login',
    authController.login
)

authRouter.post('/register',
    authController.register
)

authRouter.get('/logout',
    authController.logout
)

authRouter.post('/send-confirm-email',
    authController.sendConfirmationEmail
)

authRouter.post('/confirm-email/:confirmationCode',
    authController.confirmEmail
)

authRouter.post('/forgot-password',
    authController.forgotPassword
)

authRouter.get('/confirmationCode',
    authMiddleware.getRestrictHandler(PERMISSIONS.CAN_LOGIN),
    authedCr(authController.generateConfirmationCode)
)

authRouter.post('/reset-password/:confirmationCode',
    authController.resetPassword
)

export {
    authRouter
}
