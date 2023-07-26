import { Request, Response } from '@/types';
import jwtLib, { Secret } from 'jsonwebtoken';
import { projectConfig } from '@/config';
import { User } from '@/components/users/types';

function generateToken(user: User) {
  return jwtLib.sign(
    {
      _id: user._id.toString(),
      email: user.email
    },
    projectConfig.JWT_API_KEY as Secret,
    { expiresIn: projectConfig.EXPIRATION_TOKEN }
  );
}

function getRequestToken(req: Request) { return req.signedCookies['token']; }

function clearToken(res: Response) { res.clearCookie('token'); }

const jwtService = {
  jwt: jwtLib,
  generateToken,
  getRequestToken,
  clearToken
};

export {
  jwtService
};
