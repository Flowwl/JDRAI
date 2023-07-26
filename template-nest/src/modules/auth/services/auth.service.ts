import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "@backend/modules/users";
import { JwtService } from "@nestjs/jwt";
import { UserJwtPayload } from "@backend/modules/auth/types";
import { BcryptService } from "@backend/externalModules";
import { Role } from "@backend/roles";
import { ObjectId } from "@backend/utils";
import { User } from "@backend/modules/users/schemas";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService, private bcryptService: BcryptService) {}

  async login(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email, ["_id", "email", "password"]);
    if (!user) {
      throw new NotFoundException()
    }
    
    const arePasswordTheSame = await this.bcryptService.comparePasswords(pass, user.password)
    if (! arePasswordTheSame) {
      throw new UnauthorizedException();
    }
    return this.refreshUserAccessToken(user)
  }

  async logout(userId: ObjectId) {
    return this.updateUserAccessToken(userId, null)
  }
  
  async register(email: string, password: string) {
   return this.usersService.create({
     email,
     password,
     isConfirmed: false,
     confirmationCode: null,
     roles: [Role.User],
   })
  }
  
  async refreshUserAccessToken(user: User) {
    const payload: UserJwtPayload = { _id: user._id, email: user.email };
    const token = {
      access_token: await this.jwtService.signAsync(payload, { expiresIn: "30d"})
    };

    await this.updateUserAccessToken(user._id, token.access_token)

    return token
  }
  
  async updateUserAccessToken(userId: ObjectId, accessToken: User["accessToken"]) {
    return this.usersService.updateOneById(userId, { accessToken })
  }
}
