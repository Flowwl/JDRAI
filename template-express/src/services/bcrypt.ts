import bcryptLib from 'bcryptjs'

function encryptPassword(password: string){ return bcryptLib.hashSync(password, 8)}
function comparePassword(password1: string, password2: string){ return bcryptLib.compareSync(password1, password2) }

export const bcryptService = {
    encryptPassword,
    comparePassword
}
