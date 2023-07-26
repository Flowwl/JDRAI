import { NextFunction, Request, Response } from '@/types';
import { jwtService } from '@/services';

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    jwtService.clearToken(res);
    return res.send('Session successfully deleted');
  } catch (e) { return next(e); }
}
