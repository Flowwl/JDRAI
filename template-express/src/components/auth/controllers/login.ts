import { NextFunction, Request, Response } from '@/types';
import { bcryptService, httpErrorService, jwtService } from '@/services';
import { ERROR_KEYS, MESSAGES } from '@/enums';
import { IsDefined, IsEmail, IsString } from 'class-validator';
import { validateAndConvert } from '@/utils';
import { authConfig } from '../config';
import { userService } from "@/components/users/service";

class Body {
  @IsDefined()
  @IsEmail()
  email!: string;

  @IsDefined()
  @IsString()
  password!: string;
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = await validateAndConvert(Body, req.body);
    const user = await userService.findUserByEmail(email);
    if (! user) { throw httpErrorService.badRequest(MESSAGES.notFound); }

    if (user.password && ! bcryptService.comparePassword(password, user.password)) { throw httpErrorService.badRequest(MESSAGES.notFound); }
    if (! user.isConfirmed) { throw httpErrorService.badRequest(MESSAGES.notFound, ERROR_KEYS.USER_NOT_CONFIRMED); }

    const token = jwtService.generateToken(user);
    const cookiedRes = res.cookie('token', token, authConfig.cookieConfig);
    return cookiedRes.send("Login Successful");
  } catch (e) { return next(e); }
}
