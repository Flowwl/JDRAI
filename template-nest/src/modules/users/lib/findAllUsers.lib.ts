import { Injectable } from "@nestjs/common";
import { UsersService } from "../services";

@Injectable()
export class FindAllUsersLib {
  constructor(private readonly usersService: UsersService) {}

  findAllUsers() {
    return this.usersService.findAll(["_id", "email"])
  }
}
