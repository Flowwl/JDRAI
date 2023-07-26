import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { buildConfig } from "@backend/config";
import { UsersService } from "@backend/modules/users";
import { UserJwtPayload } from "@backend/modules/auth/types";
import { Reflector } from "@nestjs/core";
import { IS_AUTHED_KEY } from "./auth.decorator";
import { AuthService } from "@backend/modules";
import { COOKIES } from "./auth.constants";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private userService: UsersService, @Inject(forwardRef(() => AuthService)) private authService: AuthService, private reflector: Reflector) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      return this._canActivate(context);
    } catch (e) {
      const response = context.switchToHttp().getResponse();
      response.clearCookie(COOKIES.TOKEN);
      throw e;
    }
  }

  private async _canActivate(context: ExecutionContext) {
    const isAuthed = this.reflector.getAllAndOverride<boolean>(IS_AUTHED_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (! isAuthed) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const user = await this.extractUserFromHeader(request);
    if (!user) {
      throw new UnauthorizedException();
    }

    const { access_token } = await this.authService.refreshUserAccessToken(user);
    response.cookie(COOKIES.TOKEN, access_token);
    request["user"] = user;
    
    return true;
  }
  

  private async extractUserFromHeader(request: any) {
    const token = request.cookies?.[COOKIES.TOKEN];
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: UserJwtPayload = await this.jwtService.verifyAsync(token, {
        secret: buildConfig().JWT_API_KEY
      });
      return this.userService.findOneByEmail(payload.email);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
