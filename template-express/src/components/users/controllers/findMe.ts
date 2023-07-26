import { AuthedRequest, NextFunction, Response } from '@/types';
import { httpErrorService } from '@/services';
import { MESSAGES } from '@/enums';
import { getPermissionListForRoleId } from '@/utils';
import { userService } from "@/components/users/service";

export async function findMe(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const { user: { _id } } = req;
    const me = await userService.findById(_id);
    if (! me) { throw httpErrorService.notFound(MESSAGES.notFound); }

    return res.send({
      ...me,
      permissionList: getPermissionListForRoleId(me.roleId)
    });
  } catch (e) { return next(e); }
}
