import { Body, Controller, HttpCode, HttpStatus, Post, Response } from "@nestjs/common";
import { AuthService } from "../services";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { ExpressResponse } from "@backend/modules";
import { COOKIES } from "@backend/modules/auth/auth.constants";

export class LoginBody {
  @ApiProperty({ example: "toto@example.com", description: "The email of the user to be created" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "anyStrongPassword", description: "The password of the user" })
  @IsNotEmpty()
  password: string;
}

@ApiTags("auth")
@Controller("auth/login")
export class LoginController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginBody: LoginBody, @Response() res: ExpressResponse) {
    const { access_token } = await this.authService.login(loginBody.email, loginBody.password);
    res.cookie(COOKIES.TOKEN, access_token)
    
    return res.sendStatus(HttpStatus.OK);
  }
}
