import { MESSAGES, PERMISSIONS } from '@/enums';
import { httpErrorService, jwtService } from '@/services';
import { AuthedRequest, NextFunction, Request, Response } from '@/types';
import { User } from '@/components/users/types';
import { userService } from '@/components/users/service';
import { authConfig } from '@/components/auth/config';
import { JwtPayload, Secret } from 'jsonwebtoken';
import { hasPermission } from '@/utils';
import { ObjectId } from "mongodb";

async function getUserFromRequestToken(req: Request, res: Response): Promise<User> {
    try {
        const token = jwtService.getRequestToken(req)
        const decoded = jwtService.jwt.verify(token, authConfig.secret as Secret) as JwtPayload

        const user = await userService.findById(ObjectId.createFromHexString(decoded._id))
        assertUserExists(user)

        return user
    } catch (err) {
        throw httpErrorService.forbidden(MESSAGES.emptyOrInvalidToken, "EMPTY_TOKEN")
    }

    function assertUserExists(user: User | null): asserts user is User {
        if (!user) {
            jwtService.clearToken(res)
            throw httpErrorService.unauthorized()
        }
    }
}

async function addUserToRequest(req: Request, res: Response, next: NextFunction, perm: PERMISSIONS) {
    try {
        const user = await getUserFromRequestToken(req, res)
        assertUserHasPermission(user)

        Object.assign(req, {
            ...req,
            user
        } as AuthedRequest)

        return next()
    } catch (e) { return next(e) }

    function assertUserHasPermission(user: User) {
        if (! hasPermission(user, perm)) {
            throw httpErrorService.unauthorized(MESSAGES.unauthorized)
        }
    }
}

function getRestrictHandler(perm: PERMISSIONS) {
    return (req: Request, res: Response, next: NextFunction) => addUserToRequest(req, res, next, perm)
}

export const authMiddleware = {
  getRestrictHandler
}
