import { Controller, Get, HttpCode, HttpStatus, Request, Response } from "@nestjs/common";
import { AuthService } from "../services";
import { ApiTags } from "@nestjs/swagger";
import { AuthedRequest, ExpressResponse } from "../types";
import { COOKIES } from "@backend/modules/auth/auth.constants";
import { Authed } from "@backend/modules/auth/auth.decorator";

@ApiTags("auth")
@Controller("auth/logout")
export class LogoutController {
  constructor(private authService: AuthService) {}

  @Get()
  @Authed()
  @HttpCode(HttpStatus.OK)
  async logout(@Request() req: AuthedRequest, @Response() res: ExpressResponse) {
    res.clearCookie(COOKIES.TOKEN)
    await this.authService.logout(req.user._id);
    
    return res.sendStatus(HttpStatus.OK)
  }
}
