import { NextFunction, Request, Response } from '@/types';
import { httpErrorService } from '@/services';
import { MESSAGES } from '@/enums';
import { IsDefined, IsString } from 'class-validator';
import { validateAndConvert } from '@/utils';
import { userService } from "@/components/users/service";

class Params {
  @IsDefined()
  @IsString()
  confirmationCode!: string;
}

export async function confirmEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const { confirmationCode } = await validateAndConvert(Params, req.params);

    const user = await userService.findUserByConfirmationCode(confirmationCode);
    if (! user) { throw httpErrorService.notFound(MESSAGES.notFound); }

    const updatedUser = await userService.update({ ...user, isConfirmed: true, confirmationCode: null }, user._id);
    
    return res.send(`Email confirmed for ${user.email}`);
  } catch (e) { return next(e); }
}
