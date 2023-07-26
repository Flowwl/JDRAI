import { NextFunction, Request, Response } from '@/types';
import { httpErrorService } from '@/services';
import { MESSAGES } from '@/enums';
import { IsDefined, IsEmail } from 'class-validator';
import { validateAndConvert } from '@/utils';
import { ObjectId } from "mongodb";
import { userService } from "@/components/users/service";

class Body {
  @IsDefined()
  @IsEmail()
  email!: string;
}

export async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = await validateAndConvert(Body, req.body);
    const user = await userService.findUserByEmail(email);
    if (! user) { throw httpErrorService.notFound(MESSAGES.notFound); }
    const confirmationCode = new ObjectId().toString();

    await userService.update({ ...user, confirmationCode }, user.id);

    return res.send('Reset email password sent');
  } catch (e) { return next(e); }
}
