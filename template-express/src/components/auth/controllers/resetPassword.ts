import { NextFunction, Request, Response } from '@/types';
import { passwordRegexp } from '@/components/users/validation';
import { bcryptService, httpErrorService } from '@/services';
import { MESSAGES } from '@/enums';
import { IsDefined, IsString, Matches } from 'class-validator';
import { validateAndConvert } from '@/utils';
import { userService } from "@/components/users/service";

class Params {
  @IsDefined()
  @IsString()
  confirmationCode!: string;
}

class Body {
  @IsDefined()
  @IsString()
  @Matches(passwordRegexp)
  password!: string;
}

export async function resetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { confirmationCode } = await validateAndConvert(Params, req.params);
    const { password } = await validateAndConvert(Body, req.body);

    const user = await userService.findUserByConfirmationCode(confirmationCode);
    if (! user) { throw httpErrorService.notFound(MESSAGES.notFound); }

    await userService.update({
      ...user,
      password: bcryptService.encryptPassword(password),
      isConfirmed: true,
      confirmationCode: null
    }, user._id);
    return res.send(`Password updated for ${user.email}`);
  } catch (e) { return next(e); }
}
