import { Injectable } from "@nestjs/common";
import { AuthService, UsersService } from "@backend/modules";
import { User } from "@backend/modules/users/schemas";


@Injectable()
export class MockedAuthService {
  constructor(private usersService: UsersService, private authService: AuthService) {}
  
  async getLoginToken(user: User) {
    await this.usersService.create(user);
    return this.authService.login(user.email, user.password)

  }
}
