import { confirmEmail } from "./confirmEmail"
import { forgotPassword } from "./forgotPassword"
import { generateConfirmationCode } from "./generateConfirmationCode"
import { login } from "./login"
import { logout } from "./logout"
import { register } from "./register"
import { resetPassword } from "./resetPassword"
import { sendConfirmationEmail } from "./sendConfirmationEmail"

export const authController = {
    confirmEmail,
    forgotPassword,
    generateConfirmationCode,
    login,
    logout,
    register,
    resetPassword,
    sendConfirmationEmail
}
