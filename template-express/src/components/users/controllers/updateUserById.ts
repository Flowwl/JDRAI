import { AuthedRequest, NextFunction, Response } from '@/types';
import { httpErrorService } from '@/services';
import { IsDefined, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { validateAndConvert } from '@/utils';
import { ROLES } from '@/enums';
import { ConvertToObjectId } from "@/utils/classValidator";
import { ObjectId } from "mongodb";
import { userService } from "@/components/users/service";
import { IsObjectId } from "class-validator-mongo-object-id";

class Params {
  @IsDefined()
  @IsObjectId()
  @ConvertToObjectId()
  id!: ObjectId
}

class Body {
  @IsOptional()
  @IsNumber()
  @Min(ROLES.USER)
  @Max(ROLES.USER)
  roleId!: ROLES
}

export async function updateUserById(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const { user: me } = req
    const { id } = await validateAndConvert(Params, req.params)
    const { roleId } = await validateAndConvert(Body, req.body)

    if (roleId >= me.roleId) { throw httpErrorService.badRequest() }
    await userService.update({ roleId }, id)

    return res.send('User successfully updated')
  } catch (e) { return next(e) }
}
