import { AuthedRequest, NextFunction, Response } from '@/types';
import { httpErrorService } from '@/services';
import { MESSAGES } from '@/enums';
import { IsDefined, IsEmail } from 'class-validator';
import { validateAndConvert } from '@/utils';
import { userService } from "@/components/users/service";


class Body {
  @IsDefined()
  @IsEmail()
  email!: string;
}

export async function updateMe(req: AuthedRequest, res: Response, next: NextFunction) {
  try {
    const { user: me } = req;
    const { email } = await validateAndConvert(Body, req.body);

    if (email !== me.email) {
      const userInDb = await userService.findUserByEmail(email);
      if (userInDb && userInDb.id !== me._id) { throw httpErrorService.conflict(MESSAGES.alreadyExists); }
    }

    await userService.update({ email }, me._id);
    return res.send('User successfully updated');
  } catch (e) { return next(e); }
}
