import { NextFunction, Request, Response } from '@/types';
import { passwordRegexp } from '@/components/users/validation';
import { bcryptService, httpErrorService } from '@/services';
import { MESSAGES, ROLES } from '@/enums';
import { IsDefined, IsEmail, IsString, Matches } from 'class-validator';
import { validateAndConvert } from '@/utils';
import { ObjectId } from "mongodb";
import { userService } from "@/components/users/service";


class Body {
  @IsDefined()
  @IsEmail()
  email!: string;

  @IsDefined()
  @IsString()
  @Matches(passwordRegexp)
  password!: string;
}

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = await validateAndConvert(Body, req.body);
    const user = await userService.findUserByEmail(email);
    if (user) { throw httpErrorService.conflict(MESSAGES.alreadyExists); }

    const confirmationCode = new ObjectId().toString();
    const userCreated = await userService.create({
      _id: new ObjectId(),
      email: email,
      password: bcryptService.encryptPassword(password),
      isConfirmed: true,
      roleId: ROLES.USER,
      confirmationCode
    });

    return res.send(userCreated);
  } catch (e) { return next(e); }
}

export {
  register
};
