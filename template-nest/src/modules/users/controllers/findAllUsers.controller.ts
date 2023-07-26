import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "@backend/modules/users/schemas";
import { Role, Roles } from "@backend/roles";
import { FindAllUsersLib } from "../lib";
import { Authed } from "@backend/modules/auth/auth.decorator";

@ApiTags("users")
@Controller("users")
export class FindAllUsersController {
  constructor(private readonly findAllUsersLib: FindAllUsersLib) {}

  @Get()
  @ApiResponse({ status: 200, description: "The users record", type: User, isArray: true })
  @Authed()
  @Roles(Role.Admin, Role.Moderator)
  findAll() {
    return this.findAllUsersLib.findAllUsers();
  }
}
