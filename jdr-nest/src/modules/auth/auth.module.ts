import { Module } from "@nestjs/common";
import { AuthService } from "./services";
import { UsersModule } from "@backend/modules/users";
import { BcryptModule, JwtModule } from "@backend/externalModules";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";
import { LoginController, RegisterController, LogoutController } from "./controllers";

@Module({
  imports: [UsersModule, JwtModule, ConfigModule, BcryptModule],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
  ],
  controllers: [LoginController, RegisterController, LogoutController]
})
export class AuthModule {}
