import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "../services";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { AUTH_EVENTS, UserRegisteredEvent } from "@backend/modules/auth/events";
import { UsersService } from "@backend/modules";

export class RegisterBody {
  @ApiProperty({ example: "toto@example.com", description: "The email of the user to be created" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "anyStrongPassword", description: "The password of the user" })
  @IsNotEmpty()
  password: string;
}

@ApiTags("auth")
@Controller("auth/register")
export class RegisterController {
  constructor(private authService: AuthService, private userService: UsersService, private eventEmitter: EventEmitter2) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async register(@Body() registerBody: RegisterBody) {
    const isRegistered = await this.authService.register(registerBody.email, registerBody.password);
    
    const user = await this.userService.findOneByEmail(registerBody.email)
    this.eventEmitter.emit(AUTH_EVENTS.USER_REGISTERED, new UserRegisteredEvent(user._id, user.email));
    
    return isRegistered;
  }
}
